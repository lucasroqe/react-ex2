import { useColor } from "../contexts/Contexto";
import Input from "../components/Input";
import styled from "styled-components";
import rgbService from "../services/RGB";
import { useEffect, useState } from "react";

export function Main() {
  const { rgb, setColor } = useColor();
  const [currentId, setCurrentId] = useState(0); 

  const buscaRGB = async (id: number | undefined) => {
    const rgbData = await rgbService.get(id);

    if ('error' in rgbData) {
      console.error(rgbData.error);
      return;
    }

    const { r, g, b } = rgbData;
    setColor(r, g, b); 
  };

  useEffect(() => {
    buscaRGB(currentId); 
  }, [currentId]);

  const salvaRGB = async () => {
    const result = await rgbService.save(rgb.r, rgb.g, rgb.b);
    if ('error' in result) console.error(result.error);
  };

  const testaTecla = (event: any) => {
    if (event.key === 'Enter' || event.key === 'Tab') salvaRGB();
  };

  const teclaSeta = (event: any) => {
    if (event.key === 'ArrowRight') setCurrentId(currentId + 1); 

    if (event.key === 'ArrowLeft') {
      if (currentId > 0) setCurrentId(currentId - 1); 
    }
  };

  return (
    <Wrapper onKeyDown={teclaSeta} tabIndex={0}>
      <ColorBox rgb={rgb}>
        <Input label="R" value={rgb.r} onChange={(value) => setColor(value, rgb.g, rgb.b)} onKeyDown={testaTecla} />
        <Input label="G" value={rgb.g} onChange={(value) => setColor(rgb.r, value, rgb.b)} onKeyDown={testaTecla} />
        <Input label="B" value={rgb.b} onChange={(value) => setColor(rgb.r, rgb.g, value)} onKeyDown={testaTecla} />
      </ColorBox>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  outline: none;
`;

const ColorBox = styled.div<{ rgb: { r: number; g: number; b: number } }>`
  background-color: rgb(${({ rgb }) => `${rgb.r}, ${rgb.g}, ${rgb.b}`});
  border: 1px solid #000;
  display: flex;
  flex-direction: row;
  padding: 30px;
  gap: 30px;
  color: rgb(${({ rgb }) => `${255 - rgb.r}, ${255 - rgb.g}, ${255 - rgb.b}`});
`;