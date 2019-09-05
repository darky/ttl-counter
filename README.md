# TTL counter

TTL counter allow you to define some counters with TTL expire. Also you can call callback, when some threshold of counter reached.

### Example

```typescript
import { TTLCounter } from 'ttl-counter';

const ttlCounter = new TTLCounter({
  ttl: 60 * 1000 // TTL for specific counter,
  countForCb: 50 // After 50 count per minute, callback called,
  cb (counterId) {
    // For example, many errors occured per minute, restart pod
    process.exit(1);
  }
});

// On error call
ttlCounter.count('error');
```
