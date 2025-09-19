/* Gemini Pro — interactive UI (fake data for demo) */
(() => {
  // initial fake state
  let balance = 1245;
  const transactions = [
    {time: 'Sep 18, 2025 • 17:34', text: 'Daily Login Bonus', amount: +50},
    {time: 'Sep 18, 2025 • 17:12', text: 'Mini-Game Victory', amount: +100},
    {time: 'Sep 17, 2025 • 20:03', text: 'Redeemed Emoji Pack', amount: -200},
    {time: 'Sep 16, 2025 • 16:01', text: 'Community Event Reward', amount: +500},
    {time: 'Sep 15, 2025 • 09:11', text: 'Referral Bonus', amount: +80},
  ];

  const leaders = [
    {rank:1, name:'StarGamer42', value:4320},
    {rank:2, name:'PixelNinja99', value:3875},
    {rank:3, name:'ChatMasterX', value:3450},
    {rank:4, name:'LunaKid', value:2780},
    {rank:5, name:'EchoWave', value:2600},
  ];

  // DOM refs
  const balanceEl = document.getElementById('balance');
  const feedEl = document.getElementById('feed');
  const lbRows = document.getElementById('leaderboardRows');
  const redeemBtn = document.getElementById('redeemBtn');
  const redeemModal = document.getElementById('redeemModal');
  const closeRedeem = document.getElementById('closeRedeem');
  const redeemMsg = document.getElementById('redeemMsg');

  // animate counter (smooth)
  function animateCounter(target, el, duration = 900) {
    const start = 0;
    const diff = target - start;
    const stepTime = 20;
    const steps = Math.max(Math.floor(duration / stepTime), 1);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + diff * eased);
      el.textContent = `${value} 💎`;
      if (step >= steps) clearInterval(timer);
    }, stepTime);
  }

  // populate feed
  function renderFeed() {
    feedEl.innerHTML = '';
    transactions.forEach(tx => {
      const node = document.createElement('div');
      node.className = 'feed-item';
      node.innerHTML = `
        <div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(180deg,#6f61ff,#7be2ff);display:flex;align-items:center;justify-content:center;font-weight:800">💎</div>
        <div class="meta">
          <div class="title">${tx.text}</div>
          <div class="time">${tx.time}</div>
        </div>
        <div class="amount">${tx.amount > 0 ? '+'+tx.amount : tx.amount}</div>
      `;
      feedEl.appendChild(node);
    });
  }

  // populate leaderboard
  function renderLeaderboard() {
    lbRows.innerHTML = '';
    leaders.forEach((l, i) => {
      const row = document.createElement('div');
      row.className = `leaderboard-row ${i % 2 ? 'even':''}`;
      row.innerHTML = `<div>${l.rank}</div><div>${l.name}</div><div class="right">${l.value.toLocaleString()} 💎</div>`;
      lbRows.appendChild(row);
    });
  }

  // open/close modal
  function openRedeem() {
    redeemModal.setAttribute('aria-hidden','false');
  }
  function closeRedeemFn() {
    redeemModal.setAttribute('aria-hidden','true');
    redeemMsg.textContent = '';
  }

  // redeem click logic (fake)
  function handleRedeemClick(e) {
    const btn = e.target.closest('button[data-cost]');
    if (!btn) return;
    const cost = Number(btn.dataset.cost);
    const name = btn.dataset.name;
    if (balance >= cost) {
      balance -= cost;
      // push transaction
      transactions.unshift({time: (new Date()).toLocaleString(), text: `Redeemed ${name}`, amount: -cost});
      renderFeed();
      animateCounter(balance, balanceEl);
      redeemMsg.textContent = `Success — ${name} redeemed for ${cost} 💎.`;
    } else {
      redeemMsg.textContent = `Insufficient balance to redeem ${name}.`;
    }
  }

  // Earn button simulate small reward
  document.getElementById('earnBtn').addEventListener('click', () => {
    const reward = 25 + Math.floor(Math.random()*75);
    balance += reward;
    transactions.unshift({time: (new Date()).toLocaleString(), text: `Earned Gemini (quick)`, amount: +reward});
    renderFeed();
    animateCounter(balance, balanceEl);
  });

  // open feed button (scroll)
  document.getElementById('openFeed').addEventListener('click', () => {
    feedEl.scrollIntoView({behavior:'smooth'});
  });

  // Redeem modal events
  redeemBtn.addEventListener('click', openRedeem);
  closeRedeem.addEventListener('click', closeRedeemFn);
  redeemModal.addEventListener('click', (ev) => {
    if (ev.target === redeemModal) closeRedeemFn();
  });
  redeemModal.addEventListener('click', handleRedeemClick);

  // init
  animateCounter(balance, balanceEl);
  renderFeed();
  renderLeaderboard();

  // small UX: animate feed by rotating last item to top
  setInterval(() => {
    // rotate simulated stream
    const sample = {time: (new Date()).toLocaleTimeString(), text: 'Community Challenge Completed', amount: + (10 + Math.floor(Math.random()*200))};
    transactions.unshift(sample);
    if (transactions.length > 12) transactions.pop();
    renderFeed();
  }, 7000);

})();
