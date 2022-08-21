import React from 'react'
import "./Profile.css"

function profile(student) {
    return (
        <div className="YourProfile__body">
          
              <div class="YourProfile__container">
                <div class="YourProfile__main-body">
                  <nav aria-label="breadcrumb" class="main-breadcrumb">
                    <ol class="breadcrumb">
                     
                      <li class="breadcrumb-item">
                        <a href="javascript:void(0)">User</a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        User Profile
                      </li>
                    </ol>
                  </nav>
    
                  <div class="row YourProfile__gutters-sm">
                    <div class="col-md-4 mb-3">
                      <div class="YourProfile__card">
                        <div class="YourProfile__card-body">
                          <div class="d-flex flex-column align-items-center text-center">
                           
                            <div class="mt-3">
                              <h2>
                                hello
                              </h2>
                              <h3>S3 Mechanical</h3>
    
                              {/* <p class="text-secondary mb-1">Full Stack Developer</p>
                          <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                          <button class="btn btn-primary">Follow</button>
                          <button class="btn btn-outline-primary">Message</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="YourProfile__card mb-3">
                        <div class="YourProfile__card-body">
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">Full Name</h3>
                            </div>
    
                            <div class="col-sm-9 text-secondary">
                              hello
                            </div>
                          </div>
                          <hr />
    
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">Email</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">mail</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">Father Name</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              hello
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">Mother Name</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                             hello
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">DOB</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              hello
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">Mobile No</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                             hello
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">SSLC</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                             hello
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">PLUS TWO</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                             hello
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <h3 class="mb-0">Address</h3>
                            </div>
                            <div class="col-sm-9 text-secondary">
                             hello
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
         
        </div>
      );
}

export default profile
