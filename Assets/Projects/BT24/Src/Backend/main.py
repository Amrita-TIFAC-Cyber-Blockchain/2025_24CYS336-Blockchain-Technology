from models import Nanogrid, Blockchain, AI_Controller
import os
import sys
import threading
import time
import random
import logging
import numpy as np
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, RootModel
from web3 import Web3
from web3.exceptions import ContractLogicError

# ----------------------------------------------------------------------
# Logging
# ----------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)

# ----------------------------------------------------------------------
# Fix Python path so simulation package can be imported
# ----------------------------------------------------------------------
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

# ----------------------------------------------------------------------
## Models already imported above; no simulation.models import needed

# ----------------------------------------------------------------------
# FastAPI Application
# ----------------------------------------------------------------------
app = FastAPI(
    title="Smart Grid 3.0",
    description="Decentralized Smart Grid API with Simulation and Live Modes",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------------------------
# Shared State and Configuration
# ----------------------------------------------------------------------
MODE = os.environ.get("APP_MODE", "live").lower()
NUM_NANOGRIDS = 5

simulation_state = {
    "nanogrids": {},
    "time_of_day": 12.0,
    "blockchain": None,
    "ai_controller": None,
}

# ----------------------------------------------------------------------
# API Models
# ----------------------------------------------------------------------
class NanogridStatus(BaseModel):
    nanogrid_id: int
    solar_output: float
    load_demand: float
    battery_soc: float
    address: str


class Transaction(BaseModel):
    sender: str
    receiver: str
    amountInKwh: int
    timestamp: int


class TransactionHistory(RootModel):
    root: list[Transaction]


class LoadFlowPrediction(BaseModel):
    nanogrid_id: int
    predicted_solar: float
    predicted_load: float
    predicted_balance: float
    confidence: float
    timestamp: str


class FaultPrediction(BaseModel):
    nanogrid_id: int
    fault_probability: float
    fault_type: str
    severity: str
    recommendation: str


class AIRecommendation(BaseModel):
    type: str
    priority: str
    message: str
    action: str
    estimated_benefit: float

# ----------------------------------------------------------------------
# Simulation and Blockchain Logic
# ----------------------------------------------------------------------
def init_simulation(num_nanogrids=NUM_NANOGRIDS):
    """Initializes simulation models and state for offline mode."""
    for i in range(num_nanogrids):
        address = f"0x{i+1:040x}"
        simulation_state["nanogrids"][address] = Nanogrid(nanogrid_id=i + 1)

    simulation_state["blockchain"] = Blockchain()
    simulation_state["ai_controller"] = AI_Controller(
        simulation_state["nanogrids"], simulation_state["blockchain"]
    )

    logging.info("✅ Simulation initialized in OFFLINE mode.")


def run_simulation_thread():
    """Background thread to run the offline simulation with solar 50–150 kW and demand 25–55 kW."""
    while True:
        total_generation = 0
        total_demand = 0

        for ng in simulation_state["nanogrids"].values():
            solar_output = random.uniform(50.0, 150.0)
            load_demand = random.uniform(25.0, 55.0)

            ng.load_demand = load_demand
            ng.update_state(solar_output)

            total_generation += solar_output
            total_demand += load_demand

        # Energy market management
        simulation_state["ai_controller"].manage_energy_market()
        logging.info("P2P trades executed in simulation.")
        logging.info(f"Final Total Generation: {total_generation:.2f} kW")
        logging.info(f"Final Total Demand: {total_demand:.2f} kW")

        for address, ng in simulation_state["nanogrids"].items():
            logging.info(
                f"Nanogrid {ng.nanogrid_id} | Gen: {ng.solar_panel.output:.2f} kW "
                f"| Demand: {ng.load_demand:.2f} kW | Battery: {ng.battery.state_of_charge:.2f} kWh"
            )

        time.sleep(1)


def init_live_mode():
    """Initializes live blockchain connection and simulation models."""
    global w3, contract, owner_account, prosumer_accounts

    w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:9545'))

    if not w3.is_connected():
        logging.error("❌ Failed to connect to local blockchain. Ensure it's running.")
        sys.exit(1)
    
    abi_json = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "initialOwner",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
      },
      {
        "anonymous": False,
        "inputs": [
          {
            "indexed": True,
            "internalType": "address",
            "name": "prosumer",
            "type": "address"
          },
          {
            "indexed": False,
            "internalType": "uint256",
            "name": "newBalance",
            "type": "uint256"
          }
        ],
        "name": "EnergyReported",
        "type": "event"
      },
      {
        "anonymous": False,
        "inputs": [
          {
            "indexed": True,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": True,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": False,
        "inputs": [
          {
            "indexed": True,
            "internalType": "address",
            "name": "prosumer",
            "type": "address"
          }
        ],
        "name": "ProsumerRegistered",
        "type": "event"
      },
      {
        "anonymous": False,
        "inputs": [
          {
            "indexed": True,
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "indexed": True,
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "indexed": False,
            "internalType": "uint256",
            "name": "amountInKwh",
            "type": "uint256"
          },
          {
            "indexed": False,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "TradeCompleted",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amountInKwh",
            "type": "uint256"
          }
        ],
        "name": "executeP2PTrade",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTransactions",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amountInKwh",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct EnergyMarket.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": True
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isProsumer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": True
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "prosumerEnergyBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": True
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_prosumer",
            "type": "address"
          }
        ],
        "name": "registerProsumer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_surplusInKwh",
            "type": "uint256"
          }
        ],
        "name": "reportEnergySurplus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactionHistory",
        "outputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amountInKwh",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": True
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]

   # Replace with your deployed contract address
    contract_address = '0xd25B8DE4715326bd1Ae5505E9E2f6a0AD1cE1fE8'

    contract = w3.eth.contract(address=contract_address, abi=abi_json)
    owner_account = w3.eth.accounts[0]
    prosumer_accounts = w3.eth.accounts[1:NUM_NANOGRIDS + 1]

    for i, address in enumerate(prosumer_accounts):
        simulation_state["nanogrids"][address] = Nanogrid(nanogrid_id=i + 1)

    logging.info("⚡ Running in LIVE mode.")
    logging.info(f"Connected to blockchain: {w3.is_connected()}")


def run_live_simulation_thread():
    """Background thread to run the live simulation with solar 50–150 kW and demand 25–55 kW."""
    while True:
        total_generation = 0
        total_demand = 0

        for address, ng in simulation_state["nanogrids"].items():
            solar_output = random.uniform(50.0, 150.0)
            load_demand = random.uniform(25.0, 55.0)

            ng.load_demand = load_demand
            ng.update_state(solar_output)

            total_generation += solar_output
            total_demand += load_demand

        logging.info(f"Final Total Generation: {total_generation:.2f} kW")
        logging.info(f"Final Total Demand: {total_demand:.2f} kW")

        # Attempt blockchain trades
        for seller_address, ng in simulation_state["nanogrids"].items():
            if ng.current_power_balance > 0:
                for buyer_addr in simulation_state["nanogrids"].keys():
                    if seller_address != buyer_addr and simulation_state["nanogrids"][buyer_addr].current_power_balance < 0:
                        trade_amount = min(
                            int(ng.current_power_balance),
                            int(abs(simulation_state["nanogrids"][buyer_addr].current_power_balance))
                        )

                        if trade_amount > 0:
                            try:
                                tx_hash = contract.functions.executeP2PTrade(
                                    buyer_addr, trade_amount
                                ).transact({'from': seller_address})

                                w3.eth.wait_for_transaction_receipt(tx_hash)
                                logging.info(f"Trade executed: {seller_address} -> {buyer_addr}, {trade_amount} kWh")

                            except ContractLogicError as e:
                                logging.error(f"Trade failed {seller_address} -> {buyer_addr}: {e}")

        for address, ng in simulation_state["nanogrids"].items():
            logging.info(
                f"Nanogrid {ng.nanogrid_id} | Gen: {ng.solar_panel.output:.2f} kW "
                f"| Demand: {ng.load_demand:.2f} kW | Battery: {ng.battery.state_of_charge:.2f} kWh"
            )

        time.sleep(1)

# ----------------------------------------------------------------------
# Startup Event
# ----------------------------------------------------------------------
@app.on_event("startup")
async def startup_event():
    """Initializes the application based on the MODE environment variable."""
    if MODE == "live":
        init_live_mode()

        for addr in prosumer_accounts:
            try:
                tx_hash = contract.functions.registerProsumer(addr).transact({'from': owner_account})
                w3.eth.wait_for_transaction_receipt(tx_hash)
                logging.info(f"Registered prosumer: {addr}")
            except ContractLogicError as e:
                if "Prosumer is already registered" in str(e):
                    logging.warning(f"Prosumer {addr} already registered.")
                else:
                    raise e

        thread = threading.Thread(target=run_live_simulation_thread, daemon=True)
        thread.start()

    else:
        init_simulation()
        thread = threading.Thread(target=run_simulation_thread, daemon=True)
        thread.start()

# ----------------------------------------------------------------------
# API Endpoints
# ----------------------------------------------------------------------
@app.get("/api/grid-status", response_model=list[NanogridStatus])
def get_grid_status():
    """Return nanogrid status for all simulated nanogrids."""
    status_list = []
    for address, ng in simulation_state["nanogrids"].items():
        status_list.append(
            NanogridStatus(
                nanogrid_id=ng.nanogrid_id,
                solar_output=ng.solar_panel.output,
                load_demand=ng.load_demand,
                battery_soc=ng.battery.state_of_charge,
                address=address,
            )
        )
    return status_list


@app.get("/api/nanogrids/status", response_model=list[NanogridStatus])
def get_nanogrids_status():
    """Return nanogrid status for all simulated nanogrids."""
    return get_grid_status()


@app.get("/api/blockchain/transactions", response_model=TransactionHistory)
def get_blockchain_transactions():
    """Return energy transaction history."""
    if MODE == "live":
        try:
            transactions = contract.functions.getTransactions().call()
            return TransactionHistory(
                root=[
                    Transaction(
                        sender=tx[0],
                        receiver=tx[1],
                        amountInKwh=tx[2],
                        timestamp=tx[3]
                    )
                    for tx in transactions
                ]
            )
        except Exception as e:
            logging.error(f"Error fetching live transactions: {e}")
            return TransactionHistory(root=[])
    else:
        txs = simulation_state["blockchain"].transactions
        return TransactionHistory(
            root=[
                Transaction(
                    sender=tx["sender"],
                    receiver=tx["receiver"],
                    amountInKwh=tx["amount"],
                    timestamp=int(time.time())
                )
                for tx in txs
            ]
        )


@app.get("/api/system/status")
def get_system_status():
    """Return system status information."""
    return {
        "mode": MODE,
        "totalNanogrids": NUM_NANOGRIDS,
        "nanogridsOnline": len(simulation_state["nanogrids"]),
        "blockchainConnected": MODE == "live" and 'w3' in globals() and w3.is_connected() if MODE == "live" else True,
        "aiControllerActive": simulation_state["ai_controller"] is not None,
        "networkHealth": 85 + (len(simulation_state["nanogrids"]) / NUM_NANOGRIDS) * 15,
        "marketPrice": 0.10 + (hash(str(time.time())) % 100) / 10000  # Simple price variation
    }


@app.get("/api/market/orders")
def get_market_orders():
    """Return current market buy and sell orders."""
    # Generate market orders based on current nanogrid states
    buy_orders = []
    sell_orders = []
    
    for address, ng in simulation_state["nanogrids"].items():
        if ng.current_power_balance < 0:  # Needs energy (buyer)
            buy_orders.append({
                "address": address,
                "amount": abs(ng.current_power_balance),
                "price": 0.08 + (hash(address) % 40) / 1000,  # Price variation
                "timestamp": int(time.time())
            })
        elif ng.current_power_balance > 0:  # Has surplus (seller)
            sell_orders.append({
                "address": address,
                "amount": ng.current_power_balance,
                "price": 0.11 + (hash(address) % 40) / 1000,  # Price variation
                "timestamp": int(time.time())
            })
    
    # Sort orders by price
    buy_orders.sort(key=lambda x: x["price"], reverse=True)  # Highest price first
    sell_orders.sort(key=lambda x: x["price"])  # Lowest price first
    
    return {
        "buy_orders": buy_orders,
        "sell_orders": sell_orders
    }


# ----------------------------------------------------------------------
# AI/ML Prediction Endpoints
# ----------------------------------------------------------------------
@app.get("/api/ai/load-flow-prediction")
def predict_load_flow(nanogrid_id: int = None):
    """Predict load flow for nanogrids using AI/ML models."""
    predictions = []
    
    target_nanogrids = simulation_state["nanogrids"].items()
    if nanogrid_id is not None:
        target_nanogrids = [(addr, ng) for addr, ng in target_nanogrids if ng.nanogrid_id == nanogrid_id]
    
    for address, ng in target_nanogrids:
        # Simple ML prediction model (simulated)
        current_hour = datetime.now().hour
        
        # Predict solar based on time of day (peak at noon)
        solar_factor = max(0, np.sin(np.pi * current_hour / 12))
        predicted_solar = ng.solar_panel.output * (1 + random.uniform(-0.1, 0.1)) * solar_factor
        
        # Predict load with slight variation
        predicted_load = ng.load_demand * (1 + random.uniform(-0.15, 0.15))
        
        # Calculate predicted balance
        predicted_balance = predicted_solar - predicted_load
        
        # Confidence based on historical variance (simulated)
        confidence = random.uniform(0.75, 0.95)
        
        predictions.append(LoadFlowPrediction(
            nanogrid_id=ng.nanogrid_id,
            predicted_solar=round(predicted_solar, 2),
            predicted_load=round(predicted_load, 2),
            predicted_balance=round(predicted_balance, 2),
            confidence=round(confidence, 2),
            timestamp=(datetime.now() + timedelta(hours=1)).isoformat()
        ))
    
    return predictions


@app.get("/api/ai/fault-prediction")
def predict_faults(nanogrid_id: int = None):
    """Predict potential faults in nanogrids using AI analysis."""
    fault_predictions = []
    
    target_nanogrids = simulation_state["nanogrids"].items()
    if nanogrid_id is not None:
        target_nanogrids = [(addr, ng) for addr, ng in target_nanogrids if ng.nanogrid_id == nanogrid_id]
    
    for address, ng in target_nanogrids:
        # Analyze battery health and system stress
        battery_stress = (100 - ng.battery.health) / 100
        load_stress = ng.load_demand / 100  # Normalized
        
        # Simple ML model for fault prediction
        fault_prob = battery_stress * 0.3 + load_stress * 0.2 + random.uniform(0, 0.3)
        fault_prob = min(fault_prob, 0.95)
        
        # Determine fault type and severity
        if fault_prob > 0.7:
            fault_type = "Battery Degradation"
            severity = "high"
            recommendation = "Schedule immediate battery maintenance. Consider replacement."
        elif fault_prob > 0.4:
            fault_type = "Load Imbalance"
            severity = "medium"
            recommendation = "Optimize load distribution. Monitor battery discharge patterns."
        else:
            fault_type = "Minor Fluctuations"
            severity = "low"
            recommendation = "Continue normal operation. Regular monitoring recommended."
        
        fault_predictions.append(FaultPrediction(
            nanogrid_id=ng.nanogrid_id,
            fault_probability=round(fault_prob, 2),
            fault_type=fault_type,
            severity=severity,
            recommendation=recommendation
        ))
    
    return fault_predictions


@app.get("/api/ai/recommendations")
def get_ai_recommendations():
    """Get AI-powered recommendations for grid optimization."""
    recommendations = []
    
    # Analyze overall grid state
    total_surplus = sum(ng.current_power_balance for ng in simulation_state["nanogrids"].values() if ng.current_power_balance > 0)
    total_deficit = sum(abs(ng.current_power_balance) for ng in simulation_state["nanogrids"].values() if ng.current_power_balance < 0)
    
    # Generate recommendations based on grid analysis
    if total_surplus > total_deficit * 1.5:
        recommendations.append(AIRecommendation(
            type="Energy Trading",
            priority="high",
            message="Significant energy surplus detected across the grid",
            action="Consider selling excess energy to external markets or storing in community batteries",
            estimated_benefit=round((total_surplus - total_deficit) * 0.12, 2)
        ))
    
    if total_deficit > total_surplus:
        recommendations.append(AIRecommendation(
            type="Load Management",
            priority="high",
            message="Grid deficit detected. Energy demand exceeds supply",
            action="Activate demand response programs. Purchase energy from external sources",
            estimated_benefit=round(total_deficit * 0.15, 2)
        ))
    
    # Battery optimization
    low_battery_count = sum(1 for ng in simulation_state["nanogrids"].values() if ng.battery.state_of_charge < 5)
    if low_battery_count > 0:
        recommendations.append(AIRecommendation(
            type="Battery Management",
            priority="medium",
            message=f"{low_battery_count} nanogrids have low battery charge",
            action="Prioritize charging for critical loads. Implement battery balancing strategy",
            estimated_benefit=round(low_battery_count * 2.5, 2)
        ))
    
    # Market pricing recommendation
    avg_balance = np.mean([ng.current_power_balance for ng in simulation_state["nanogrids"].values()])
    if abs(avg_balance) < 1:
        recommendations.append(AIRecommendation(
            type="Market Optimization",
            priority="low",
            message="Grid is well-balanced. Optimal time for peer-to-peer trading",
            action="Enable P2P energy trading with dynamic pricing for maximum efficiency",
            estimated_benefit=round(len(simulation_state["nanogrids"]) * 1.2, 2)
        ))
    
    return recommendations


# ----------------------------------------------------------------------
# Frontend Mount
# ----------------------------------------------------------------------
frontend_dir = os.path.join(project_root, "frontend/dist")
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
    logging.info(f"🌍 Frontend mounted from {frontend_dir}")
else:
    logging.warning(f"⚠️ Frontend directory '{frontend_dir}' not found.")
