# 🍋 Lemon Cash Mini App - First App

A simple Mini App integrated with Lemon Cash, featuring user authentication and crypto deposits.

## 📋 Features

- ✅ **WebView Detection** - Checks if the app is running inside Lemon Cash
- 🔐 **SIWE Authentication** - Authenticate users with Sign In With Ethereum
- 💰 **Deposit Functionality** - Deposit USDC from Lemon Cash wallet to Mini App wallet
- 🎨 **Modern UI** - Beautiful and responsive user interface
- ⚡ **Built with Vite** - Fast development and build experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- GitHub Personal Access Token with `read:packages` permission
- Lemon Cash mobile app (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elmol/lemonade.git
   cd lemon
   ```

2. **Set up GitHub authentication**
   
   The `@lemonatio/mini-app-sdk` package is hosted on GitHub Packages. You need to configure authentication:
   
   a. Create a `.npmrc` file in the project root (already present):
   ```ini
   @lemonatio:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```
   
   b. Set your GitHub token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_github_token_here
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📱 Testing

To fully test the Mini App features (authentication and deposits), you need to:

1. Build the app: `npm run build`
2. Deploy the app to a hosting service (Vercel, Netlify, etc.)
3. Open the deployed URL in the Lemon Cash mobile app

**Note**: When testing outside the Lemon Cash app, you'll see a message indicating that the app needs to be opened in Lemon Cash.

## 🏗️ Project Structure

```
lemon/
├── src/
│   ├── MiniApp.tsx      # Main Mini App component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── package.json         # Dependencies and scripts
└── .npmrc              # npm registry configuration
```

## 🔑 Key Components

### MiniApp Component

The main component includes:
- **WebView Detection**: Uses `isWebView()` to check environment
- **Authentication Flow**: Automatically authenticates on mount
- **Deposit Handler**: Allows users to deposit 100 USDC
- **Error Handling**: Comprehensive error and cancellation handling
- **User Feedback**: Visual feedback for all states (loading, success, error)

### Example Code

```typescript
import { authenticate, deposit, isWebView } from '@lemonatio/mini-app-sdk';

// Check if running in WebView
if (!isWebView()) {
  return <div>Please open this app in Lemon Cash</div>;
}

// Authenticate user
const result = await authenticate();
if (result.result === TransactionResult.SUCCESS) {
  console.log('Wallet:', result.data.wallet);
}

// Deposit funds
const depositResult = await deposit({
  amount: '100',
  tokenName: 'USDC',
});
```

## 📚 Documentation

Full SDK documentation is available in `llms-full.md` or at the [Lemon Cash Docs](https://lemoncash.mintlify.app/).

Key functions:
- [`authenticate`](https://lemoncash.mintlify.app/functions/authenticate) - User authentication with SIWE
- [`deposit`](https://lemoncash.mintlify.app/functions/deposit) - Deposit crypto to Mini App wallet
- [`withdraw`](https://lemoncash.mintlify.app/functions/withdraw) - Withdraw from Mini App wallet
- [`callSmartContract`](https://lemoncash.mintlify.app/functions/call-smart-contract) - Interact with smart contracts
- [`isWebView`](https://lemoncash.mintlify.app/functions/is-webview) - Check WebView environment

## 🛠️ Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Lemon Cash Mini App SDK** - Integration with Lemon Cash

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues with the Lemon Cash SDK, please refer to the [official documentation](https://lemoncash.mintlify.app/) or contact Lemon Cash support.
