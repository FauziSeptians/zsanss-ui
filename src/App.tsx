import PinInput from "lib/components/PinInput";

function App() {
  return <div className="w-full h-screen bg-red-300 flex items-center justify-center">
    <div className="bg-green-400 max-w-lg w-full flex gap-5"><PinInput showNumeric/></div>
  </div>;
}

export default App;
