# Massa - automatic rolls buyer

## Description
This simple script periodically fetches your massa node to check if you can buy rolls (massa staking unit. 1 roll = 100 MAS). If you can, it will automatically buy them for you.


## Installation
1. Clone this repository
2. Install the packages
```bash
npm install
```
3. Create a `.env` file in the root of the project with the following content:
```bash
# Public API endpoint that the application will connect to.
PUBLIC_API=https://your_public_api_endpoint_here

# Private API endpoint that the application will connect to.
PRIVATE_API=https://your_private_api_endpoint_here

# The staker's private key used in operations related to staking.
STAKER_PRIVATE_KEY=your_staker_private_key_here

# Interval in seconds, defaulting to 4 hours (14400 seconds) if not set.
INTERVAL=14400

# Fee in the smallest unit of currency, defaulting to 0 if not set.
FEE=0
```
4. Run the script
```bash
ts-node src/index.ts

// or compile and run
npm run build
npm start
```

## License
This project is licensed under the MIT License

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Disclaimer
This project is not affiliated with the Massa project in any way. Use it at your own risk.




