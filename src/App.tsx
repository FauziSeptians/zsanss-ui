import Button from "@/components/Button";

function App() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex flex-col gap-4">
        <Button isProcessing>Simpan</Button>
        <Button isDisable>Simpan</Button>
        <Button variant="secondary">Simpan</Button>
        <Button variant="bordered">Simpan</Button>
        <Button radius="full">Simpan</Button>
        <Button radius="md">Simpan</Button>
      </div>
    </div>
  );
}

export default App;
