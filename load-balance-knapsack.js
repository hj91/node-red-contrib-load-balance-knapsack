/**

 node-red-contrib-load-balance-knapsack/load-balance-knapsack.js - Copyright 2023 Harshad Joshi and Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/

module.exports = function(RED) {
    function LoadBalanceKnapsackNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        
        // Store gadget consumptions
        var gadgets = {};

        node.on('input', function(msg) {
            // If it's the max_load_capacity topic
            if (msg.topic === 'max_load_capacity') {
                let maxCapacity = msg.payload;

                let loads = Object.values(gadgets);
                let names = Object.keys(gadgets);

                // Modified knapsack to also return the selected items
                function knapsackWithItems(values, weights, capacity) {
                    let n = values.length;
                    let matrix = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

                    for (let i = 1; i <= n; i++) {
                        for (let w = 1; w <= capacity; w++) {
                            if (weights[i - 1] <= w) {
                                if (values[i - 1] + matrix[i - 1][w - weights[i - 1]] > matrix[i - 1][w]) {
                                    matrix[i][w] = values[i - 1] + matrix[i - 1][w - weights[i - 1]];
                                } else {
                                    matrix[i][w] = matrix[i - 1][w];
                                }
                            } else {
                                matrix[i][w] = matrix[i - 1][w];
                            }
                        }
                    }

                    // Extract the selected gadgets
                    let w = capacity;
                    let selectedGadgets = [];
                    for (let i = n; i > 0 && w > 0; i--) {
                        if (matrix[i][w] !== matrix[i - 1][w]) {
                            selectedGadgets.push(names[i - 1]);
                            w = w - weights[i - 1];
                        }
                    }

                    return selectedGadgets;
                }

                msg.payload = knapsackWithItems(loads, loads, maxCapacity);
                node.send(msg);

            } else {
                // Store the gadget and its consumption
                gadgets[msg.topic] = msg.payload;
            }
        });
    }

    RED.nodes.registerType("load-balance-knapsack", LoadBalanceKnapsackNode);
}

