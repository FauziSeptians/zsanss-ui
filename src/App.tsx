import Button from "@/components/Button";
import Input from "@/components/Dropdown";
import InputWrapper from "@/components/Input";
import Search from "@/components/Input/Search";
import TabWrapper from "@/components/Tab";
import { VARIANT } from "@/constants/input";
import { COLOR, SIZE } from "@/constants/tab";
import { Card, itemTypes, Typography } from "@/main";
import { useState } from "react";

function App() {
  const [val, setVal] = useState<itemTypes | null>(null);

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex flex-col gap-8 max-w-2xl w-full">
        <div className="flex flex-col gap-4">
          <Button isProcessing>Simpan</Button>
          <Button isDisable>Simpan</Button>
          <Button variant="secondary">Simpan</Button>
          <Button variant="bordered">Simpan</Button>
          <Button radius="full">Simpan</Button>
          <Button radius="md">Simpan</Button>
        </div>
        <div className="flex flex-col gap-4">
          <TabWrapper
            item={[
              { key: "fauzi", value: "fauzi" },
              { key: "fauzi1", value: "fauzi1" },
              { key: "fauzi2", value: "fauzi2" },
              { key: "fauzi3", value: "fauzi3" },
              { key: "fauzi4", value: "fauzi4" },
            ]}
          />
          <TabWrapper
            variant="bordered"
            item={[
              { key: "fauzi", value: "fauzi" },
              { key: "fauzi1", value: "fauzi1" },
              { key: "fauzi2", value: "fauzi2" },
              { key: "fauzi3", value: "fauzi3" },
              { key: "fauzi4", value: "fauzi4" },
            ]}
          />
          <TabWrapper
            radius={SIZE.FULL}
            highlightColor={COLOR.NEUTRAL}
            item={[
              { key: "fauzi", value: "fauzi" },
              { key: "fauzi1", value: "fauzi1" },
              { key: "fauzi2", value: "fauzi2" },
              { key: "fauzi3", value: "fauzi3" },
              { key: "fauzi4", value: "fauzi4" },
            ]}
          />
          <TabWrapper
            variant="underline"
            item={[
              { key: "fauzi", value: "fauzi" },
              { key: "fauzi1", value: "fauzi1" },
              { key: "fauzi2", value: "fauzi2" },
              { key: "fauzi3", value: "fauzi3" },
              { key: "fauzi4", value: "fauzi4" },
            ]}
          />
        </div>
        <div>
          <Input
            item={[
              { key: "fauzi", value: "fauzi" },
              { key: "fauzi1", value: "fauzi1" },
              { key: "fauzi2", value: "fauzi2" },
              { key: "fauzi3", value: "fauzi3" },
              { key: "fauzi4", value: "fauzi4" },
              { key: "fauzi5", value: "fauzi5" },
              { key: "fauzi21", value: "fauzi2" },
              { key: "fauzi31", value: "fauzi3" },
              { key: "fauzi41", value: "fauzi4" },
              { key: "fauzi51", value: "fauzi5" },
            ]}
            value={{ key: "fauzi2", value: "fauzi2" }}
          >
            <Input.Search setSearch={(val) => console.log(val)} searchValue={""} />
            <Input.Dropdown onClick={(val: itemTypes) => setVal(val)} />
          </Input>
        </div>{" "}
        <InputWrapper type="text" placeHolder="hallo" label="test ini label" />
        <InputWrapper
          type="text"
          inputVariant={VARIANT.UNDERLINED}
          placeHolder="hallo"
          label="test ini label"
          value="hallosemuanya ini test errror"
          error="ada kesalahan pada format penulisan"
          readOnly={true}
        />
        <InputWrapper
          type="text"
          inputVariant={VARIANT.BORDERED}
          placeHolder="hallo"
        />
        <Search setSearch={(val) => console.log(val)} searchValue={""} />
        <div>
          <Typography.Title>Hallo hallo bandung</Typography.Title>
          <Typography.Text>{val?.key}</Typography.Text>
          <Typography.Text>
            Lorem Ipsum is a dummy text commonly used in graphic design,
            publishing, and web development. It originates from sections 1.10.32
            and 1.10.33 of Cicero's "de Finibus Bonorum et Malorum", written in
            45 BC, which discusses ethics. The phrase "Lorem ipsum dolor sit
            amet" is derived from this text and has been used as placeholder
            text since the Renaissance. It allows designers to focus on layout
            and visual elements without being distracted by meaningful content.
          </Typography.Text>
        </div>
        <div className="flex justify-center">
          <Card>
            <Card.Description
              title="hallo"
              description="lorem"
            ></Card.Description>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
