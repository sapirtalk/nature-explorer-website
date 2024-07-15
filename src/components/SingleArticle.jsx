'use client';

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import logo from '../../public/resources/images/logo/logo.png';


const SingleArticle = ({
  title = "No Title",
  source = "No Source",
  text = "No Text",
  writtenAt,
  updatedAt,
  image = [],
  url
}) => {
  return (
    <div dir="rtl">
      <Card className="lg:w-[21vw] lg:h-[25vh] flex flex-col">
      <div className="flex flex-col flex-[2]">
        <CardHeader className="flex-1">
          <div className="w-[35%]">
            {image.length == 0 ? (
              <div>
                  <Image src={logo} alt='logo' width={80} height={80} />
              </div>
            ) : (
              <Image 
                src={`/resources/images/trails/${image[0]}/${image[0]}.jpg`}
                alt={title}
                width={80}
                height={80} 
                className="w-full h-full rounded-r-lg" 
              />
            )}
            </div>
            <div className="flex flex-col w-full">
              <header className="text-text font-bold">{title}</header>
              <p className="text-small text-default-500">{source}</p>
              <p className="text-xs text-default-500">
                נכתב ב: &nbsp;
                {new Date(writtenAt).toLocaleDateString()} 
              </p>
            </div>
          </CardHeader>
          <Divider />
        </div>

        <CardBody className="flex-[6]">
          <p>{text}</p>
        </CardBody>
        <Divider />
        <CardFooter className="flex-[2]">
          {url ? (
            <Link
              isExternal
              showAnchorIcon
              href={url}
              className="text-primary-500"
            >
              לכניסה לכתבה
            </Link>
          ) : (
            <p>No URL available</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleArticle;
