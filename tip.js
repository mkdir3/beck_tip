const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector("form");

const send = async function (amount) {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  //   convert the amount to ether value
  const wei_value = web3.utils.toWei(amount, "ether");

  if (accounts.length > 0) {
    const transaction = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0xF19B6c02E9158A29167Ff6dc191B1013F97AAda5",
          value: web3.utils.toHex(wei_value),
        },
      ],
    });
  }
};

form.classList.add("has-eth");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (window.ethereum) {
    const input = form.querySelector("input");
    send(input.value);
  } else {
    alert("Please install a wallet");
  }
});
