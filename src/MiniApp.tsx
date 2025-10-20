import React, { useEffect, useState } from 'react';
import { authenticate, deposit, isWebView, TransactionResult, TokenName } from '@lemonatio/mini-app-sdk';

export const MiniApp: React.FC = () => {
  const [wallet, setWallet] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleAuthentication = async () => {
    try {
      setIsLoading(true);
      const result = await authenticate();
      
      if (result.result === TransactionResult.SUCCESS) {
        setWallet(result.data.wallet);
        setMessage('Authentication successful!');
      } else if (result.result === TransactionResult.FAILED) {
        setMessage(`Authentication failed: ${result.error}`);
      } else if (result.result === TransactionResult.CANCELLED) {
        setMessage('Authentication cancelled by user');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage('Authentication error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAuthentication();
  }, []);

  const handleDeposit = async () => {
    try {
      setIsLoading(true);
      setMessage('Processing deposit...');
      
      const result = await deposit({
        amount: '100',
        tokenName: TokenName.USDC,
      });
      
      if (result.result === TransactionResult.SUCCESS) {
        setMessage(`Deposit successful! TX: ${result.data.txHash}`);
        console.log('Deposit successful:', result.data.txHash);
      } else if (result.result === TransactionResult.FAILED) {
        setMessage(`Deposit failed: ${result.error.message}`);
      } else if (result.result === TransactionResult.CANCELLED) {
        setMessage('Deposit cancelled by user');
      }
    } catch (error) {
      console.error('Deposit failed:', error);
      setMessage('Deposit error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isWebView()) {
    return (
      <div className="container not-webview">
        <h1>⚠️ Not in Lemon Cash</h1>
        <p>Please open this app inside the Lemon Cash mobile application to use all features.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>🍋 Lemon Cash Mini App</h1>
        <p>Your first Mini App integration</p>
      </header>

      <section className="wallet-section">
        <h2>Wallet Status</h2>
        {isLoading && !wallet ? (
          <div className="loading">Authenticating...</div>
        ) : wallet ? (
          <div className="wallet-info">
            <div className="status">✅ Connected</div>
            <div className="address">
              {wallet.slice(0, 8)}...{wallet.slice(-8)}
            </div>
          </div>
        ) : (
          <div className="status">❌ Not connected</div>
        )}
      </section>

      <section className="actions-section">
        <h2>Actions</h2>
        <button 
          onClick={handleDeposit} 
          disabled={!wallet || isLoading}
          className="deposit-button"
        >
          {isLoading ? 'Processing...' : 'Send 100 USDC'}
        </button>
      </section>

      {message && (
        <section className="message-section">
          <div className={`message ${message.includes('success') ? 'success' : message.includes('failed') || message.includes('error') ? 'error' : 'info'}`}>
            {message}
          </div>
        </section>
      )}

      <footer>
        <p>Built with Lemon Cash Mini App SDK</p>
      </footer>
    </div>
  );
};

