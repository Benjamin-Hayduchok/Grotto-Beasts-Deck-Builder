import { RefObject, MouseEvent } from "react";

export const useRotateToMouse = (
  inputRef: RefObject<HTMLDivElement>,
  glowRef: RefObject<HTMLDivElement>
) => {
  // TODO: NV - Idk what the correct type is for these
  const rotateToMouse = (e: any) => {
    if (inputRef.current) {
      var bounds = inputRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      inputRef.current.style.transform = `
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
            `;
      if (glowRef.current) {
        glowRef.current.style.backgroundImage = `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width / 2}px
                    ${center.y * 2 + bounds.height / 2}px,
                    #ffffff55,
                    #0000000f
                )
                `;
      }
    }
  };

  const removeListener = (e: any) => {
    if (inputRef.current) {
      inputRef.current.style.transform = "";
    }
    if (glowRef.current) {
      glowRef.current.style.backgroundImage = "none";
    }
  };

  return { rotateToMouse, removeListener };
};
