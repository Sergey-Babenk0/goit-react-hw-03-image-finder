import { Component } from 'react';
import css from './app.module.css';
import { SearchBar } from './Searchbar/Searchbar';
// import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import axios from 'axios';
// import { SearchBar } from './Searchbar/Searchbar';

// axios.defaults.baseURL =
//   'https://pixabay.com/api/?q=cat&page=1&key=34683209-8b2cd5e146e244d990d25d370&image_type=photo&orientation=horizontal&per_page=12';
export class App extends Component {
  state = {
    value: '',
  };
  handleSearchFormSubmit = value => {
    this.setState({ value });
  };

  resetValue = value => {
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery value={this.state.value} onResetValue={this.resetValue} />
        {/* <ToastContainer autoClose={3500} /> */}
      </div>
    );
  }
}
// export class App extends Component {
//   state = {
//     images: [],
//   };

//   getValue = () => {};

//   render() {
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 40,
//           color: '#010101',
//         }}
//       >
// //         <SearchBar onSubmit={this.getValue} />
// //       </div>
//     );
//   }
// }
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       <SearchBar />
//     </div>
//   );
// };
