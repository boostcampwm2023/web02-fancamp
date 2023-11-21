import { TailSpin } from 'react-loader-spinner';

function Spinner() {
  return (
    <div className="h-[10rem] w-full">
      <TailSpin
        height="32"
        width="32"
        color="#0087E9"
        ariaLabel="loading-spinner"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="relative center w-fit"
        visible
      />
    </div>
  );
}

export default Spinner;
