# node-red-contrib-load-balance-knapsack

A Node-RED node that load balances electric consumption based on the knapsack algorithm.

## Description

This node receives MQTT messages with topics representing gadget names and their associated electric consumption values as payloads. When a message with the topic `max_load_capacity` is received, the node calculates which gadgets can be turned on without exceeding the provided maximum capacity. The resulting payload will contain an array of gadget names that can be turned on within the max capacity.

## Installation

Install directly from your Node-RED's setting palette or:

```bash
npm install node-red-contrib-load-balance-knapsack
```

## Usage

1. Drag and drop the `load-balance-knapsack` node from the palette to your flow.
2. Connect MQTT nodes or other input nodes to feed electric consumption data.
3. Send a message with the topic `max_load_capacity` to trigger the load-balancing algorithm.
4. The node will output an array of gadget names that can operate within the given max capacity.

## Example Input

```json
{
  "topic": "kitchen/mixer",
  "payload": 30
}
```

To trigger the load balancing:

```json
{
  "topic": "max_load_capacity",
  "payload": 100
}
```

## Issues and Feedback

For any issues or feedback related to this node, please open an issue on the [GitHub repository](https://github.com/hj91/node-red-contrib-load-balance-knapsack/issues).

## Author

**Harshad Joshi**  
[GitHub](https://github.com/hj91)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

