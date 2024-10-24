import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({ label, value, onChange, onKeyDown}:Props) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Math.max(Number(e.target.value), 0), 255);
    onChange(newValue);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <input
        type="number"
        min={0}
        max={255}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`