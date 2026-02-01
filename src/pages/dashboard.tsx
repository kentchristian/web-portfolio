import PageContainer from "../components/containers/PageContainer";




const Dashboard = () => {
  return (
    <PageContainer className="border p-2">
      <div className="grid grid-cols-3 p-5 border">
        <section>First Screen</section>
        <hr />
        <section >Second Screen</section>

      </div>
    </PageContainer>
  )
};

export default Dashboard;
