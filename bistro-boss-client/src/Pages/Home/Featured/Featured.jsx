import SectionTItle from "../../../Components/SectionTItle/SectionTItle";
import feured from "../../../assets/home/featured.jpg";
import './featured.css'
const Featured = () => {
  return (
    <div className="bg p-24 text-white my-24 bg-fixed  bg-black bg-opacity-30" >
      <SectionTItle
        subHeading={"Check it Out"}
        heading={"featured item"}
      ></SectionTItle>
      <div className="md:flex justify-center items-center my-6 w-3/4 gap-8 mx-auto" >
        <div>
          <img src={feured} alt="" />
        </div>
        <div className="gap-10">
          <p>March 20, 2023</p>
          <p>WHERE CAN I GET SOME?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4 border-white text-white ">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
