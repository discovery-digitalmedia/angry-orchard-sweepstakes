## Angry Orchard Sweepstakes

### Installation

Clone this repo
```
git clone [repo]
```

Install depend#encies
```
npm install
```

Run for development and go to http://localhost:8080
```
npm run dev
```

Run for devices in local network
```
npm run mobile
```
In terminal, type ifconfig look for en3 section or the one with something like inet 172.21.76.218
In your ios/android device go to http://172.21.76.218:8080

Run for production
```
npm run build
