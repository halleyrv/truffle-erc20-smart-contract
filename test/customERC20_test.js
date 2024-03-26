const customERC20 = artifacts.require("customERC20");

contract("customERC20", accounts =>{
  console.log("Accounts: " + accounts);
  it('name', async() =>{
    let instance = await customERC20.deployed();

    const _name = await instance.name.call();
    console.log(_name);
    assert.equal(_name,"Joan");
  });

  it('symbol', async() =>{
    let instance = await customERC20.deployed();

    const _symbol = await instance.symbol.call(); 
    assert.equal(_symbol,"JA");
  });

  it('decimals', async() =>{
    let instance = await customERC20.deployed();

    const _decimals = await instance.decimals.call();
    assert.equal(_decimals,18);
  });

  it('newTokens', async() =>{
    let instance = await customERC20.deployed();
    const _initial_supply = await instance.totalSupply.call();
    assert.equal(_initial_supply,0);

    await instance.crearTokens();

    let _supply = await instance.totalSupply.call();
    assert.equal(_supply, 1000);

    let _balance = await instance.balanceOf.call(accounts[0]);
    assert.equal(_balance, 1000);

  });

  it('transfer', async() =>{
    let instance = await customERC20.deployed();

    await instance.transfer(accounts[1], 10, {from: accounts[0]});

    let _balance0 = await instance.balanceOf.call(accounts[0]);

    assert.equal(_balance0, 1000-10);

    let _balance1 = await instance.balanceOf.call(accounts[1]);

    assert.equal(_balance1, 10);

  })

  it('approve, allowance & transferFrom', async() =>{
    let instance = await customERC20.deployed();
    let owner = accounts[0];
    let spender = accounts[1];
    let other_user = accounts[2];

    // Approve
    let _initial_allowance = await instance.allowance(owner, spender);
    assert.equal(_initial_allowance, 0);

    await instance.approve(spender, 100, {from: owner});
    let _current_allowance = await instance.allowance(owner, spender);

    assert.equal(_current_allowance, 100);

    // transfer
    let _balance_spender = await instance.balanceOf.call(spender);
    assert.equal(_balance_spender, 10);

    await instance.transferFrom(owner, other_user, 100, {from: spender});

    let _allowance_after_fransfer = await instance.allowance(owner, spender);
    assert.equal(_allowance_after_fransfer,0);


    let _balance2 = await instance.balanceOf.call(other_user);
    assert.equal(_balance2, 100);


  });
  
  it('increase allowance && decrease Allowance', async()=>{
    const owner = accounts[0];
    const other_user = accounts[4];
    let instance = await customERC20.deployed();

    await instance.approve(accounts[4], 100, {from: owner});
    let _allowance4 = await instance.allowance(owner,other_user);
    assert.equal(_allowance4,100);

    // Increment Allowance
    await instance.increaseAllowance(accounts[4], 200);
    let _allowance4_200 = await instance.allowance(owner,other_user);
    assert.equal(_allowance4_200, 300);

    // Decrease
    await instance.decreaseAllowance(accounts[4],50);
    let _allowance4_250 = await instance.allowance(owner,other_user);
    assert.equal(_allowance4_250, 250);

  });
});