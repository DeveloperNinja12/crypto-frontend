import { useEffect, useState } from 'react';
import { getHistory } from '../service/api';
import PriceChart from '../components/PriceChart';
import Ticker from '../components/Ticker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { currencies } from '../utils/currencies';
import { toast } from 'react-toastify';
import useDebounce from '../hook/useDebounce';

interface DataPoint {
    time: string;
    price: number;
}

const DashBoard = () => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [symbolInput, setSymbolInput] = useState('BTC');
    const debouncedSymbol = useDebounce(symbolInput, 2000);
    const [symbol, setSymbol] = useState('BTC');
    const [currency, setCurrency] = useState('USD');
    const [limit, setLimit] = useState(30);

    useEffect(() => {
        setSymbol(debouncedSymbol);
    }, [debouncedSymbol]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const history = await getHistory(symbol, currency, limit);
                setLoading(true);
                setDataPoints(history);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Failed to fetch data');
                setDataPoints([]);
            } finally {
                setLoading(false);
            }
        };
        if (limit && currency && symbol) {
            fetchData();
        }
    }, [symbol, currency, limit]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
                <Typography variant="h4" gutterBottom>
                    Crypto Dashboard — {symbol}/{currency}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, marginTop: 4 }}>
                    <FormControl variant="outlined" size="small">
                        <TextField
                            label="Symbol"
                            value={symbolInput}
                            onChange={(e) => setSymbolInput(e.target.value.toUpperCase())}
                            sx={{ minWidth: 100 }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Currency</InputLabel>
                        <Select
                            label="Currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            {currencies.map((cur) => (
                                <MenuItem key={cur} value={cur}>
                                    {cur}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small">
                        <TextField
                            label="Days"
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            sx={{ minWidth: 80 }}
                        />
                    </FormControl>
                </Box>
                <Ticker symbol={symbol} currency={currency} />
                <PriceChart data={dataPoints} />
            </Box>
        </Box>
    )
}
export default DashBoard;