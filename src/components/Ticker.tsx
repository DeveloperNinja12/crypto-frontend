// components/Ticker.tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type TickerProps = { symbol: string; currency: string };

export default function Ticker({ symbol, currency }: TickerProps) {
    const [price, setPrice] = useState<number | null>(null);
    const [timestamp, setTimestamp] = useState<string | null>(null);

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('connected to ticker server');
            // Send requested pair
            if (symbol && currency) {
                socket.emit('subscribe', { symbol, currency });
            }
        });

        socket.on('ticker', (payload: any) => {
            if (payload?.symbol === symbol && payload?.currency === currency) {
                setPrice(payload.price);
                setTimestamp(payload.timestamp);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [symbol, currency]);

    return (
        <div>
            <strong>Ticker</strong>
            <div style={{ fontSize: 20, marginTop: 6 }}>
                {symbol}/{currency}: {price !== null ? price : '—'}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>{timestamp ? new Date(timestamp).toLocaleString() : 'No updates yet'}</div>
        </div>
    );
}
