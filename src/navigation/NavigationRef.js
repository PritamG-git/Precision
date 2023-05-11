import React from 'react';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
};
export const navigatereplace = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current?.reset(name, params);
  }
};

export function goBack() {
  navigationRef.current?.goBack();
}
