import React from "react";
import {
  Facebook,
  Snapchat,
  Linkedin,
  Github,
  Instagram,
} from "../../public/assets/icons/icons";
export default function Conpage() {
  return (
    <section>
      <div className="container m-auto flex justify-between px-4 py-6 mt-5">
        <div>
          <p className="text-gray-300 text-sm mr-16">Copyright @ 2024</p>
        </div>
        <div>
          <ul className="flex gap-4 justify-center items-center">
            <li>
              <a href="https://web.facebook.com/" target="_blank">
                <Facebook className="w-5 h-5 text-gray-500 hover:text-cyan-500" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/umar-azeem-9a24b9386/"
                target="_blank"
              >
                <Linkedin className="w-5 h-5  text-gray-500 hover:text-cyan-500" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/umar_azeem.64/"
                target="_blank"
              >
                <Instagram  className="w-5 h-5  text-gray-500 hover:text-cyan-500"/>
              </a>
            </li>
            <li>
              <a
                href="https://www.snapchat.com/add/mianu2398?share_id=tu1C5egnfBw&locale=en-US"
                target="_blank"
              >
                <Snapchat className="w-5 h-5 text-gray-500 hover:text-cyan-500" />
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank">
                <Github className="w-5 h-5 text-gray-500 hover:text-cyan-500"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
