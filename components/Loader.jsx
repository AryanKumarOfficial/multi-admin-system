import { MagnifyingGlass } from "react-loader-spinner";

<MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
  wrapperClass={` text-center bg-red-700`}
  glassColor="#c0efff"
  color="#e15b64"
/>;

export default MagnifyingGlass;
