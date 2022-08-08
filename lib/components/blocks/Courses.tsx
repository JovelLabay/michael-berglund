import React from "react"

import { Course } from "@models/common"
import ChevronRightIcon from "@icons/ChevronRightIcon"
import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import CourseDetailedCard from "@components/cards/CourseDetailedCard"

export default function Courses({ course }: { course: Course[] }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[88px] bg-dark-green" />
      <div className="grid grid-cols-1 pt-8 md:pt-14 lg:grid-cols-3">
        {course?.map((AngCourse, index) => {
          return (
            <>
              <div key={index} className="px-[20px] md:col-span-2 md:pl-12 xl:mr-60">
                {/* BREADCRUMBS */}
                <div className="flex flex-row items-center ">
                  <AppLink
                    href="/board-value"
                    className="text-[14px] font-[350] tracking-wider text-dark-green hover:text-dark-blue"
                  >
                    {"Board Value".toLocaleUpperCase()}
                  </AppLink>

                  <ChevronRightIcon className="mx-3" />
                  <p className="text-[14px] font-[350] tracking-wider text-light-green">
                    {AngCourse.node.title.toLocaleUpperCase()}
                  </p>
                </div>
                <div className="mt-8 mb-[60px] md:mb-[120px] md:mt-[60px]">
                  <h1 className="md:app-h2 app-h3"> {AngCourse.node.title}</h1>
                  <Wysiwyg className="mt-8 md:mt-14" content={AngCourse.node.excerpt} />
                  <p className="pre-title my-5 font-lora leading-6 md:my-10">
                    Scelerisque mi, amet, aenean enim ut sed vitae ultrices. Proin in dui malesuada
                    fermentum eget. Aliquam eget amet viverra eu cras in. Amet aliquam malesuada
                    accumsan mi. Et tincidunt amet congue quam sed lobortis molestie. Ultrices
                    pellentesque ullamcorper tincidunt cras suspendisse auctor ac, neque. Pharetra
                    sit vulputate nunc nec sem. Risus eu in felis lacus aliquam lectus velit.
                    Tristique sagittis.
                  </p>
                  <p className="font-lora text-app-h4">Utbildningens innehåll</p>
                  <ul className="mt-8 mb-10 ml-6 list-disc">
                    <li> Massa ipsum quis mi nisl quis commodo.</li>
                    <li> Sit elementum sed pellentesque</li>
                    <li>Diam risus et feugiat nibh lacus</li>
                    <li>Sodales leo rhoncus commodo velit</li>
                    <li>Turpis magna Venenatis magna facilisis</li>
                    <li>Adipiscing pharetra Dictum suspendisse</li>
                    <li>id faucibus Nunc avenenatis montes Ac</li>
                    <li>odio nec Pellentesque potenti lacus nibh ante</li>
                  </ul>
                  <p className="pre-title my-5 font-lora leading-6 md:my-10">
                    Dolor volutpat, diam magna accumsan vulputate feugiat. Orci non sapien, sed
                    pulvinar. Tortor laoreet sit ut lacus ut netus magna porttitor. Vivamus netus
                    nunc, id amet viverra. Sit sed orci diam dui scelerisque elit massa. Faucibus id
                    dolor tristique amet, in suspendisse. Sed semper urna nascetur quam odio. Tempor
                    purus nisi, morbi in est convallis. Curabitur in in nunc senectus quam velit
                    ultrices interdum rhoncus. Eget adipiscing natoque quis auctor sit at feugiat
                    habitant. Tortor in quis massa massa rhoncus, quis consequat blandit in. Id
                    cursus consequat, pellentesque ipsum auctor. Nibh quam nisl natoque tortor.
                    Sollicitudin venenatis quis pharetra, lacus. Ipsum turpis ornare et justo, eget
                    nisi, nunc. Iaculis aliquet nulla ante potenti rhoncus sagittis sit eget
                    elementum. Erat nisi orci sed posuere lectus sem erat. Convallis ornare
                    elementum massa amet.
                  </p>
                </div>
              </div>

              <div className="">
                <CourseDetailedCard AngCourse={AngCourse} />
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
