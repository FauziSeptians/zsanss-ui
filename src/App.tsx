import Card from "@/components/Card";
import {Typography} from "zsanss-ui"


function App() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="grid grid-cols-4 gap-4">
        {["1", "2", "3", "4", "4", "4", "4", "4"].map(() => {
          return (
            <Card>
              <Card.Image src="https://media.itockphoto.com/id/2207541639/photo/young-professional-working-on-laptop-in-modern-office-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=EC_7jC-JsoyqQhouSSdc_oAqvwu_ncUkzaGt8TtFPBE="></Card.Image>
              <Card.Description
                title="Hallo semuanya perkenalkan nama saya fauzi"
                description="test"
              ></Card.Description>
              <Typography.Title>Hallo</Typography.Title>
            </Card>
          );
        })}
      </div>
      {/* <Typography.Title>Test</Typography.Title> */}
    </div>
  );
}

export default App;
