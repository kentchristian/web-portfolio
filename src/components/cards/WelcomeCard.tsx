import CardContainer from "../containers/CardContainer"

const OverviewCard = () => {
  return (
    <CardContainer
      className="w-full h-50 border flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2 ">
        <h1>Welcome Back!</h1>
        <p>Sample message for welcoming back a person</p>
      </div>
      <div className="flex flex-col gap-2">
        <button>Action 1</button>
        <button>Action 2 </button>
      </div>
    </CardContainer>
  )
}

export default OverviewCard