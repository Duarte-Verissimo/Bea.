"use client";

import React from "react";
import Calculator from "./Calculator";
import { TextAnimate } from "@/components/magicui/text-animate";

const HeroSection: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full pt-20 sm:pt-40 md:pt-28">
        <div className="relative isolate overflow-hidden pt-16 sm:px-6 md:pt-24 lg:flex lg:justify-between lg:gap-x-20 lg:px-16 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-40 lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              <TextAnimate animation="blurIn" as="span">
                Sabe quanto ganha?
              </TextAnimate>
            </h1>
            <p className="mt-6 text-lg/8 text-pretty text-gray-600">
              Para começar basta preencher o formulário com os seus dados e
              calcular o valor líquido que recebe ao final do dia.
            </p>
          </div>
          <div className="w-full mt-8 lg:mt-0">
            <Calculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
