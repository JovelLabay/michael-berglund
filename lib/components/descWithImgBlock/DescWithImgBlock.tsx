import Image from "next/image"

import mockImage from "@/public/images/mock_image_1.png"

// TODO: Connect with backend.
export const DescWithImgBlock = () => {
  return (
    <section className="flex w-full items-center justify-between space-x-[147px] bg-white px-12 pt-[100px] pb-[120px]">
      <div>
        <h3 className="app-h3 mb-[60px] text-dark-blue">Our expertise</h3>
        {/* TODO: Replace p with wysiwyg comp */}
        <p className="text-body-l">
          Arcu laoreet commodo magna commodo odio. Molestie diam hac scelerisque commodo, tempus
          scelerisque mollis mollis id. Tempus sapien eget consectetur ut volutpat diam sed. Nisl
          nunc lobortis. In leo sagittis, sed urna nunc vel, pellentesque consectetur. Risus in
          platea interdum ut sollicitudin in laoreet scelerisque eu. Diam placerat in sed nulla
          aliquam. Quisque pellentesque ut consectetur laoreet facilisis orci elementum pretium.
          Nunc, dui senectus nullam neque ullamcorper a dolor massa.{" "}
        </p>
      </div>
      <div className="relative aspect-square h-[656px] w-[656px]">
        <Image src={mockImage} alt="" layout="fill" objectFit="cover" />
      </div>
    </section>
  )
}
