import react from "react";

const Titel_navar = () => {
  return (
    <div className="header flex  items-center  max-[430px]:text-balance  max-[430px]:w-20">
      <span className="fa-solid fa-users text-2xl max-lg:text-base  text-gray-100 max-sm:pr-2 "></span>
      <h1
        className="text-2xl font-bold max-lg:text-base   max-md:text-red-300 max-md:text-sm text-white mr-3 "
        style={{ fontFamily: "Vazir-Black" }}
      >
        وب اپلیکشن مدیریت{" "}
        <a
          href="http://localhost:5173/"
          className="text-blue-400 text-2xl max-lg:text-base max-md:text-sm"
        >
          مخاطبین
        </a>
      </h1>
    </div>
  );
};

export default Titel_navar
