'use client';

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

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
            <div className="flex flex-col w-full">
              <header className="text-text font-bold">{title}</header>
              <p className="text-small text-default-500">{source}</p>
              <p className="text-xs text-default-500">
                נכתב ב: &nbsp;
                {new Date(writtenAt).toLocaleDateString()} 
              </p>
              {writtenAt !== updatedAt && (
                <p className="text-xs text-default-500">
                  עודכן ב:&nbsp;
                  {new Date(updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="w-[30%]">
              <Image 
                src={`/resources/images/trails/${image[0]}/${image[0]}.jpg`}
                alt={title}
                width={10}
                height={10} 
                className="w-full h-full rounded-r-lg" 
              />
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
