# simulation/models.py
import numpy as np
import time
import hashlib

# -------------------- Nanogrid Assets --------------------

class SolarPanel:
    """Simulates a solar panel with time-dependent output."""
    def __init__(self, panel_id: int):
        self.panel_id = panel_id
        self.output = 0

    def get_output(self, time_of_day: float):
        """Generate sine-wave-like solar output for simulation purposes."""
        self.output = max(0, 10 * np.sin(np.pi * time_of_day / 24))
        return self.output


class Battery:
    """Manages energy storage for a nanogrid."""
    def __init__(self, battery_id: int, capacity_kwh: float = 20.0):
        self.battery_id = battery_id
        self.capacity = capacity_kwh
        self.state_of_charge = capacity_kwh / 2  # initial SOC
        self.health = 100.0

    def charge(self, power_kw: float, time_step_h: float = 1.0):
        self.state_of_charge = min(self.capacity, self.state_of_charge + power_kw * time_step_h)

    def discharge(self, power_kw: float, time_step_h: float = 1.0):
        self.state_of_charge = max(0, self.state_of_charge - power_kw * time_step_h)


# -------------------- Nanogrid Simulation --------------------

class Nanogrid:
    """Represents a household nanogrid with solar, battery, and load."""
    def __init__(self, nanogrid_id: int):
        self.nanogrid_id = nanogrid_id
        self.solar_panel = SolarPanel(panel_id=nanogrid_id)
        self.battery = Battery(battery_id=nanogrid_id)
        self.load_demand = 5.0  # in kW
        self.current_power_balance = 0.0  # surplus (+) or deficit (-)

    # This method is now updated to accept solar_output as an argument
    def update_state(self, solar_output: float):
        """Update nanogrid's state using a pre-generated solar output."""
        net_power = solar_output - self.load_demand

        if net_power > 0:
            self.battery.charge(net_power)
        else:
            self.battery.discharge(abs(net_power))

        # Current power balance available for trading
        self.current_power_balance = net_power
        self.solar_panel.output = solar_output # We must update the internal object for logging purposes

        return {
            "nanogrid_id": self.nanogrid_id,
            "solar_output": solar_output,
            "load_demand": self.load_demand,
            "battery_soc": self.battery.state_of_charge,
            "power_balance": self.current_power_balance
        }

    def set_energy_trade(self, amount: float):
        """Adjust battery and power balance for energy trade."""
        if amount > 0:
            self.battery.discharge(amount)  # selling energy
        else:
            self.battery.charge(abs(amount))  # buying energy

        # Adjust balance
        self.current_power_balance -= amount


# -------------------- Simplified Blockchain --------------------

class Blockchain:
    """Tracks P2P energy transactions."""
    def __init__(self):
        self.chain = []
        self.transactions = []
        self.new_block(previous_hash="0")

    def new_block(self, previous_hash: str = None):
        block = {
            "index": len(self.chain) + 1,
            "timestamp": time.time(),
            "transactions": self.transactions.copy(),
            "previous_hash": previous_hash or self.hash(self.chain[-1]) if self.chain else "0"
        }
        block["hash"] = self.hash(block)
        self.transactions = []
        self.chain.append(block)
        return block

    def add_transaction(self, sender: int, receiver: int, amount: float):
        self.transactions.append({
            "sender": sender,
            "receiver": receiver,
            "amount": amount
        })

    @staticmethod
    def hash(block: dict) -> str:
        """Creates a SHA-256 hash of a block."""
        block_string = str(block).encode()
        return hashlib.sha256(block_string).hexdigest()


# -------------------- AI Controller --------------------

class AI_Controller:
    """Manages P2P energy trades between nanogrids."""
    def __init__(self, nanogrids: dict, blockchain: Blockchain):
        self.nanogrids = nanogrids
        self.blockchain = blockchain

    def manage_energy_market(self):
        """Match buyers and sellers and record trades."""
        sellers = {ng_id: ng for ng_id, ng in self.nanogrids.items() if ng.current_power_balance > 0}
        buyers = {ng_id: ng for ng_id, ng in self.nanogrids.items() if ng.current_power_balance < 0}

        for buyer_id, buyer_ng in buyers.items():
            if not sellers:
                break

            # pick the first seller
            seller_id, seller_ng = next(iter(sellers.items()))
            trade_amount = min(abs(buyer_ng.current_power_balance), seller_ng.current_power_balance)
            if trade_amount <= 0:
                continue

            # Perform trade
            seller_ng.set_energy_trade(trade_amount)
            buyer_ng.set_energy_trade(-trade_amount)

            # Record transaction
            self.blockchain.add_transaction(seller_id, buyer_id, trade_amount)

            # Remove seller if fully sold
            if seller_ng.current_power_balance <= 0:
                sellers.pop(seller_id)