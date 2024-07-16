'use client';

import Image from 'next/image';
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import logo from '../../public/resources/images/logo/logo.png';

const SingleArticle = ({
  title = "No Title",
  source = "No Source",
  text = "No Text",
  writtenAt,
  image = [],
  url
}) => {
  return (
    <Card className="lg:w-[21vw] lg:h-[25vh] flex flex-col" dir='rtl'>
      <CardHeader className="flex flex-col flex-[0_0_40%] overflow-hidden">
        <div className="flex flex-1">
          <div className="w-[35%] ml-3">
            {image.length === 0 ? (
              <div>
                <Image src={logo} alt='logo' width={500} height={500} />
              </div>
            ) : (
              <Image
                src={image[0]}
                width={500}
                height={500}
                className='w-full h-full rounded-lg'
              />
            )}
          </div>
          <div className="flex flex-col w-full overflow-hidden">
            <header className="text-text font-bold text-ellipsis overflow-hidden whitespace-nowrap">{title}</header>
            <p className="text-small text-default-500">{source}</p>
            <p className="text-xs text-default-500">
              נכתב ב: &nbsp;
              {new Date(writtenAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex-1 overflow-auto">
        <p className='text-right'>{text}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex-shrink-0 h-[20%]">
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
  );
};

export default SingleArticle;
