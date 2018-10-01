const App = () => {
  return (
    <div className='app'>
      <Calendar></Calendar>
      <Footer></Footer>
    </div>
  );
};

ReactDOM.render(App(), document.getElementById('app'));
