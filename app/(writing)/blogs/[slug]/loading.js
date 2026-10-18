export default function Loading() {
  return (
    <main className="pb-main">
      <div className="pb-wrap">
        <div className="pb-skel" style={{ height: 18, width: 90 }} />
        <div className="pb-skel" style={{ height: 52, marginTop: 26 }} />
        <div className="pb-skel" style={{ height: 24, width: '70%' }} />
        <div className="pb-skel" style={{ height: 300, marginTop: 30 }} />
      </div>
    </main>
  )
}
