import React , { Component } from 'react';
import ImageSelection from './ImageSelection.jsx';


function SubmitButton (props) {
  const mode = props.mode;
  if (mode == 'new') {
    return <button type="submit" className="at-btn flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4 submit ">Create</button>
  } else {
    return <button type="submit" className="at-btn flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4 submit ">Update</button>
  }
}

export default class ProductModiferForm extends React.Component {
  constructor (props) {
      super(props);
     // Don't call this.setState() here!
     this.state = { mode : 'new' };
     // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (

        <div className="content mt-3">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">

                  <div className="card-header">
                    Please fill in information for new product

                  </div>

                  <div className="card-body card-block">
                    <form action="" id="newProductForm" method="post" className="form-horizontal">
                      <div className="row">
                        <div className="col col-md-3">
                          <ImageSelection />
                        </div>

                        <div className="col col-md-7">
                          <div className="row form-group">
                            <div className="col col-md-6">
                              <label htmlFor="englishName" className=" form-control-label">English Name</label>
                              <input type="text" id="englishName" placeholder="Apples" className="form-control" required="required" />
                            </div>
                            <div className="col col-md-6">
                              <label htmlFor="khmerName" className=" form-control-label">Khmer Name</label>
                              <input type="text" id="khmerName" placeholder="ផ្លែប៉ោម" className="form-control" required="required" />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col col-md-3">
                              <label htmlFor="regularPrice" className=" form-control-label">Regular Price</label>
                              <input type="number" id="regularPrice" min="0.01" step="0.01" placeholder="$" className="form-control" />
                            </div>
                            <div className="col col-md-3">
                              <label htmlFor="salePrice" className=" form-control-label">Sale Price</label>
                              <input type="number" id="salePrice" min="0.01" step="0.01" placeholder="$" className="form-control" required="required" />
                              <small id="emailHelp" className="form-text text-muted">Customer pay this price</small>
                            </div>
                            <div className="col col-md-2">
                              <label htmlFor="unit" className=" form-control-label">Unit</label>
                              <input type="text" id="unit" placeholder="kg/gram" className="form-control" required="required" />
                            </div>

                          </div>
                          <div className="row form-group">

                            <div className="col col-md-3">
                              <label htmlFor="min" className=" form-control-label">Min</label>
                              <input type="number" id="min" min="0.01" step="0.01" placeholder="Min unit" className="form-control" />
                            </div>
                            <div className="col col-md-3">
                              <label htmlFor="step" className=" form-control-label">Step</label>
                              <input type="number" id="step" step="0.01" min="0.01" max="1" placeholder="0.01" className="form-control" />
                            </div>
                            <div className="col col-md-6">
                              <label htmlFor="purchaseNote" className=" form-control-label">Purchase Note</label>
                              <input type="text" id="purchaseNote" placeholder="" className="form-control" />
                            </div>
                          </div>
                          <div className="row form-group">

                            <div className="col col-md-12">
                              <label htmlFor="description" className=" form-control-label">Description</label>
                              <textarea name="description" id="description" rows="3" placeholder="Like... vitamin...fat...calory" className="form-control"></textarea>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-12 col-md-3 offset-md-1 form-check">
                              <div className="checkbox">
                                <label htmlFor="featured" className="form-check-label ">
                                  <input type="checkbox" id="featured" name="featured" className="form-check-input" />Featured
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 form-check">
                              <div className="checkbox">
                                <label htmlFor="instock" className="form-check-label">
                                  <input type="checkbox" id="instock" name="instock" defaultChecked="true" className="form-check-input" />In stock
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <div className="row form-group">
                            <label>Categories</label>
                            <div className="col col-md-12">
                              <div className="form-check">

                                {/* {{> checkboxCategories categoriesList}} */}

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>


                      <div className="row">
                        <div className="col-md-3">

                          <SubmitButton mode={this.state.mode}/>

                        </div>
                      </div>

                    </form>
                  </div>

                </div>

              </div>

            </div>

          </div>


        </div>
    );
  }
}
