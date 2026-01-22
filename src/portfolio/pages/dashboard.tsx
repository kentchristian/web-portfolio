const Dashboard = () => {
  return (
    <div className="grid grid-rows-3 gap-2 px-20 my-5">
      <div className="cols-pan-1 border">Welcome message here </div>
      <div className="cols-pan-1 border">Overview Cards here</div>

      <div className="cols-pan-1 border grid grid-cols-2">
        <div className="cols-pan-1 border">Metrics Here</div>
        <div className="cols-pan-1 border">Skills Description</div>
      </div>
    </div>
  );
};

export default Dashboard;
