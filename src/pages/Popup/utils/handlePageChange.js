export const handlePageChange = (currPage, targetPage, wrapper) => {
  const app = wrapper;
  const width = innerWidth + 'px';
  const height = innerHeight + 'px';
  console.table({ height: height, width: width });

  app.style.height = height;
  currPage.style.position = 'absolute';
  targetPage.style.marginLeft = '320px';
  targetPage.style.display = 'flex';

  setTimeout(() => {
    console.log('animating');
    targetPage.style.marginLeft = '0';
    currPage.style.marginLeft = '-' + width;
    targetPage.style.position = 'relative';
    app.style.height = 'auto';
  }, 50);
};
