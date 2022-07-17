import "../pages/Home.css";
function MainHome() {
  return (
    <main className="mainPage">
      <div className="aboutUs">
        <h1>THE ReCiPe Project</h1>
        <p className="content">
          We call our project R.C.P. and it stands for Responsible Consumption
          Production. The way we like to read it is RECIPE because it is a
          recipe for a better society. Our goal is to reduce the waste of food
          and help people have better prices and producers have more efficient
          production and foolproof work.
          <br />
          <br />
          This application plan to gather data of the total production and the
          total consumption. Small societies to big countries can use that data
          to reduce food waste, adjust the prices of goods and create new job
          opportunities.
        </p>
        
      </div>
      <aside className="producerRole">
        <h1>PRODUCER ROLE</h1>
        <p className="content">
          Producers provide the ReCiPe with his current estimated production and
          can have valuable data back from other producers but from consumers
          needs too. That way he can adjust his production and he can be
          prepared for the upcoming years and evolve professionally.
        </p>
      </aside>
      <aside className="consumerRole">
        <h1>CONSUMER ROLE</h1>
        <p className="content">
          Consumer provide ReCiPe with his monthly needs and he can see which
          products are available or not tha way can adjust his current needs and
          consume products that are available and plenty in the market. That way
          can achieve better prices and help in food waste.
        </p>
      </aside>
    </main>
  );
}
export default MainHome;
