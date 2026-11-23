import React from 'react';

export default function Garden({ entries, user }) {
  const c = entries.length;
  if (c === 0) {
    return (<section className="page-section reveal">
      <p className="eyebrow">YOUR SOUL GARDEN</p>
      <h1>Every reflection nourishes a living tree.</h1>
      <p className="lede">No reflections yet. Begin writing to grow your garden.</p>
      <div className="garden-card" style={{ background:'#0e1a2a', height:'400px', borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center', color:'#6a8a7a' }}>
        <p>The soil awaits your first seed.</p>
      </div>
    </section>);
  }
  const now = new Date();
  const season = ['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter'][now.getMonth()];
  const emoji = { spring:'\u2728', summer:'\u2600\uFE0F', autumn:'\U0001F342', winter:'\u2744\uFE0F' };
  const title = { spring:'Spring', summer:'Summer', autumn:'Autumn', winter:'Winter' };
  const stages = ['Barren soil','A tiny sprout','A young seedling','A sapling grows','A young tree','A sturdy tree','Blossoms bloom','Fruit ripens','An ancient tree'];
  const threshold = [0,1,2,4,7,11,16,26,41];
  let stage = 0;
  for (let i=threshold.length-1;i>=0;i--) { if (c>=threshold[i]) { stage=i; break; } }
  const growth = 1 - Math.pow(0.94, c);
  return (<section className="page-section reveal">
    <p className="eyebrow">YOUR SOUL GARDEN &bull; {title[season].toUpperCase()} {emoji[season]}</p>
    <h1>Every reflection nourishes a living tree.</h1>
    <p className="lede">{c} reflection{c!==1?'s':''} planted. {stages[stage]}.</p>
    <div className="garden-card" style={{ background:'#0f2a26', height:'400px', borderRadius:'24px', position:'relative', overflow:'hidden' }}>
      <div style={{ textAlign:'center', paddingTop:'80px', color:'#b8d4c4' }}>
        <div style={{ fontSize:'48px' }}>&#127793;</div>
        <p style={{ fontFamily:'Georgia, serif', fontSize:'16px', maxWidth:'300px', margin:'20px auto' }}>The tree grows with each reflection you plant.</p>
        <div style={{ display:'flex', justifyContent:'center', gap:'24px', marginTop:'30px' }}>
          <div><strong style={{ display:'block', color:'#e4f0e0' }}>{c}</strong><span style={{ fontSize:'12px' }}>reflections</span></div>
          <div><strong style={{ display:'block', color:'#e4f0e0' }}>{Math.round(growth*100)}%</strong><span style={{ fontSize:'12px' }}>grown</span></div>
          <div><strong style={{ display:'block', color:'#e4f0e0' }}>{emoji[season]}</strong><span style={{ fontSize:'12px' }}>{title[season]}</span></div>
        </div>
      </div>
    </div>
    {c>=5&&(<div className="milestone">
      <span>&#127793;</span>
      <div><strong>{stages[stage]}</strong><p>{c} reflections planted. Your garden is growing.</p></div>
    </div>)}
  </section>);
}