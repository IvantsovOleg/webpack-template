import * as $ from 'jquery';
import {Post} from '@models/Post';
import json from './assets/json.json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from '@/assets/webpack-logo.png';
import React from 'react';
import {render} from 'react-dom';
import '@/babel.js';
import './styles/styles.css';
import '@/styles/less.less';
import '@/styles/scss.scss';

const post = new Post('Webpack Post Title', WebpackLogo);

$('pre').addClass('code').html(post.toString(json));

const App = () => (
    <div className="container">
    <h1>Webpack template</h1>
    <h2>by Ivantsov Oleg</h2>
    <hr/>
    {/*<div className="logo"/>*/}
    {/*<hr/>*/}
    {/*<pre/>*/}
    {/*<hr/>*/}
    {/*<div className="box">*/}
    {/*    <h2>Less</h2>*/}
    {/*</div>*/}
    {/*<hr/>*/}
    {/*<div className="card">*/}
    {/*    <h2>Scss</h2>*/}
    {/*</div>*/}
</div>);

render(<App />, document.getElementById('app'));

// console.log('Post to String: ', post.toString());
//
// console.log('JSON', json);
// console.log('xml', xml);
// console.log('csv', csv);
