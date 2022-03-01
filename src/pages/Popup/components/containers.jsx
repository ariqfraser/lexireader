import styled from '@emotion/styled';

export const ColumnContainer = styled('div')(({ defaultStart = false }) => ({
  display: defaultStart === true ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'var(--grey)',
  color: '#fff',
  transition: '200ms ease-in-out',
  top: 0,
  position: defaultStart === true ? 'relative' : 'absolute',
}));

export const Dropdown = styled('div')((props) => ({
  width: '100%',
  display: 'grid',
}));
