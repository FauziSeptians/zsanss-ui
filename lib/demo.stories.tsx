import { Meta } from "@storybook/react-vite";
import { Layout, Typography, Card, Description, Image, Button } from "./main";
import Spinner from "./components/Spinner";
import InputWrapper from "./components/Input";
import { useState } from "react";
import { VARIANT } from "./constants/input";
import Search from "./components/Input/Search";

export default {
  title: "Introduction/Demo Showcase",
} as Meta;

export const Showcase = () => {
  const [valueInput, setValueInput] = useState("");

  return (
    <div className="w-full min-h-screen p-8 flex flex-col gap-16 bg-gray-50">
      {/* Typography Section */}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-3xl font-bold">
          ZSANSS-UI Components
        </Typography.Title>
        <Typography.Text className="max-w-2xl text-justify text-base leading-relaxed">
          ZSANSS-UI is more than just a component library—it's your creative
          partner in building modern, responsive, and accessible interfaces with
          ease. Whether you're crafting dashboards, landing pages, or full-scale
          applications, ZSANSS-UI gives you the building blocks to move from
          idea to execution in record time.
        </Typography.Text>
        <div className="flex gap-4 max-w-md">
          <Button variant="bordered" className="w-full">
            Outline
          </Button>
          <Button variant="primary" className="w-full">
            Default
          </Button>
        </div>
      </section>

      {/* Card Grid Section */}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-xl font-semibold">
          Card Showcase
        </Typography.Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <Card key={index}>
                <Image
                  src="https://cdn.idntimes.com/content-images/community/2022/05/278270620-569058210917491-4679329272867828612-n-568067f0db6caf5a31a299e9ced2c522-d167c4481df1ef1c0973d65ac9156101.jpg"
                  height={200}
                  alt={`Card Image ${index + 1}`}
                />
                <Description className="line-clamp-2 p-3">
                  This is a sample description for card {index + 1}.
                </Description>
              </Card>
            ))}
        </div>
      </section>

      {/* Layout Section (Optional Showcase) */}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-xl font-semibold">
          Layout Example
        </Typography.Title>
        <Layout>
          <div className="p-4 bg-white rounded-md shadow">
            This is a layout container. You can place any content here.
          </div>
        </Layout>
      </section>

      {/* Spinner*/}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-xl font-semibold">
          Spiner
        </Typography.Title>
        <div className="flex gap-4">
          <Spinner />
          <Spinner color="red" size={36} />
          <Spinner size={34} color="blue" />
        </div>
      </section>

      {/* Image */}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-xl font-semibold">
          Image
        </Typography.Title>
        <div className="flex gap-4">
          <Image
            src="https://cdn.idntimes.com/content-images/community/2022/05/278270620-569058210917491-4679329272867828612-n-568067f0db6caf5a31a299e9ced2c522-d167c4481df1ef1c0973d65ac9156101.jpg"
            className="object-bottom"
          />
        </div>
      </section>

      {/* Input */}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-xl font-semibold">
          Input
        </Typography.Title>
        <InputWrapper
          inputVariant={VARIANT.UNDERLINED}
          label="Underlined Input"
          placeHolder="Enter text..."
          type="text"
        />
      </section>

      {/* SEARCH */}
      <section className="flex flex-col gap-6">
        <Typography.Title className="text-xl font-semibold">
          Search
        </Typography.Title>
        <div className="gap-4 w-full items-center">
          <Search
            placeHolder="search"
            searchValue={valueInput}
            setSearch={(val) => setValueInput(val)}
            className="w-full"
          />

          <div className="mt-3">
            <Typography.Text bold underline>
              Result
            </Typography.Text>
            <p className="w-full text-xs text-red-600">{valueInput}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
