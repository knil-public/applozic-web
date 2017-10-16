import React from 'react'
import Helmet from 'react-helmet'
import ReactDOM from 'react-dom'

export class SideChat extends React.Component {


    componentWillUnmount() {
      if(Meteor.isCordova)
        return
      this.$sidechat.remove()
    }

    initApplozic() {
      (function (d, n) {
                      var s, h;
                      s = document.createElement("script");
                      s.type = "text/javascript";
                      s.async = true;
                      s.src = "/packages/knil_applozic-web/js/apploader.js";
                      h = document.getElementsByTagName('body')[0];
                      h.appendChild(s);
                      window.applozic = n;
                      n.init = function (t) {
                          n._globals = t;
                      }
                  })(document, window.applozic || {});
    }

    componentDidMount() {
       if(Meteor.isCordova)
        return
       console.log("sidechat mounting...")
        // window.$applozic = window.$applozic || {}
        let retry = () => {
           setTimeout(() => {
              if(window.$applozic && typeof window.$applozic.fn.applozic === "function" && window.$applozic.template)
              {
                    console.log("SideChat ready!")
                    if(typeof this.props.initOptions === 'object')
                      window.$applozic.fn.applozic(this.props.initOptions)
                    if(this.props.onLoad) this.props.onLoad()

              }
              else retry()
          },100)
        }
        window.oModal = ""
        let ui = this.ui()
        this.$sidechat = $("<div id='sidechat'></div>")
        $("body").append(this.$sidechat)
        ReactDOM.render(ui,this.$sidechat[0],() => {
            console.log("sidechat mounted...")
            this.initApplozic()
            retry()
          }
        )
	}

  render() {
    return (
        <div>
      </div>
    )
  }
  ui() {
    return (
      <div id='applozic'>
        <div id="mck-sidebox" className="mck-sidebox mck-box fade">
          <div className="mck-box-dialog mck-box-sm mck-right mck-bg-white">
            <div id="mck-sidebox-content" className="mck-sidebox-content mck-box-content">
              <div id="mck-conversation-header" className="mck-conversation-header mck-truncate n-vis" />
              <div className="mck-box-top">
                <div className="blk-lg-10">
                  <div id="mck-tab-individual" className="mck-row n-vis">
                    <div className="mck-tab-link blk-lg-4">
                      <a href="#" role="link" className="mck-conversation-tab-link"><span className="mck-icon-backward" /></a>
                    </div>
                    <div className="blk-lg-8 mck-box-title">
                      <div id="mck-tab-title" className="mck-tab-title mck-truncate">
                        Conversations</div>
                      <div id="mck-tab-status" className="mck-tab-status mck-truncate n-vis" />
                      <div className="mck-typing-box mck-truncate n-vis">
                        <span id="mck-typing-label">typing...</span>
                      </div>
                    </div>
                  </div>
                  <div id="mck-tab-conversation" className="mck-row">
                    <h4 id="mck-conversation-title" className="mck-box-title mck-truncate">Conversations</h4>
                  </div>
                </div>
                <div className="blk-lg-2">
                  <button type="button" className="mck-minimize-icon mck-box-close mck-close icon n-vis">
                    <span aria-hidden="true">−</span>
                  </button>
                  <button type="button" className="mck-box-close mck-close-sidebox move-right" data-dismiss="mckbox" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div id="mck-product-group" className="mck-tab-panel mck-btn-group mck-product-group">
                <div id="mck-product-box" className="mck-product-box n-vis mck-dropdown-toggle" data-toggle="mckdropdown" aria-expanded="true">
                  <div className="mck-row">
                    <div className="blk-lg-10">
                      <div className="mck-row">
                        <div className="blk-lg-3 mck-product-icon" />
                        <div className="blk-lg-9">
                          <div className="mck-row">
                            <div className="blk-lg-8 mck-product-title mck-truncate" />
                            <div className="move-right mck-product-rt-up mck-truncate blk-lg-4">
                              <strong className="mck-product-key" /><span className="mck-product-value" />
                            </div>
                          </div>
                          <div className="mck-row">
                            <div className="blk-lg-8 mck-truncate mck-product-subtitle" />
                            <div className="move-right mck-product-rt-down mck-truncate blk-lg-4">
                              <strong className="mck-product-key" /><span className="mck-product-value" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="blk-lg-2">
                      <span className="mck-caret n-vis" />
                    </div>
                  </div>
                </div>
                <ul id="mck-conversation-list" className="mck-dropdown-menu menu-right mck-conversation-list n-vis" role="menu" />
              </div>
              <div id="mck-tab-option-panel" className="mck-tab-panel mck-top-btn-panel">
                <div id="mck-tab-menu-box" className="mck-tab-menu-box vis">
                  <div className="mck-row">
                    <div className="blk-lg-2 move-right">
                      <div className="mck-dropdown-toggle" data-toggle="mckdropdown" aria-expanded="true">
                        <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-menu.png" alt="Tab Menu" />
                      </div>
                      <ul id="mck-tab-menu-list" className="mck-dropdown-menu mck-tab-menu-box menu-right" role="menu">
                        <li className="mck-tab-message-option"><a href="#" id="mck-btn-clear-messages" className="mck-btn-clear-messages menu-item" title="Clear Messages">
                            Clear Messages </a></li>
                        <li id="li-mck-block-user"><a href="#" id="mck-block-button" className="menu-item" title="Block User">
                            Block User </a></li>
                        <li id="li-mck-group-info" className="mck-group-menu-options">
                          <a href="#" id="mck-group-info-btn" className="menu-item" title="Group Info"> Group Info </a>
                        </li>
                        <li id="li-mck-leave-group" className="mck-group-menu-options">
                          <a href="#" id="mck-btn-leave-group" className="menu-item" title="Exit Group"> Exit Group </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mck-box-body">
                <div id="mck-message-cell" className="mck-tab-cell mck-message-cell">
                  <div id="mck-price-widget" className="mck-row mck-price-widget mck-top-widget n-vis">
                    <div className="mck-widget-panel">
                      <input type="text" id="mck-price-text-box" placeholder="Enter final agreed price" />
                      <button type="button" id="mck-price-submit" className="mck-btn mck-btn-green mck-price-submit" title="Submit">
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                  <div className="mck-message-inner" />
                  <div id="mck-contact-loading" className="mck-loading">
                    <img src="https://apps.applozic.com/resources/sidebox/css/app/images/ring.gif" alt="Loading" />
                  </div>
                  <div id="mck-no-conversations" className="mck-no-data-text mck-text-muted n-vis">
                    <h3>No conversations yet!</h3>
                  </div>
                  <div id="mck-no-messages" className="mck-no-data-text mck-text-muted n-vis">
                    <h3>No messages yet!</h3>
                  </div>
                  <div id="mck-no-more-conversations" className="mck-show-more-icon n-vis">
                    <h3>No more conversations!</h3>
                  </div>
                  <div id="mck-no-more-messages" className="mck-show-more-icon n-vis">
                    <h3>No more messages!</h3>
                  </div>
                </div>
              </div>
              <div id="mck-offline-message-box" className="mck-offline-message-box n-vis">SET DEFAULT OFFLINE
                MESSAGE!</div>
              <div id="mck-sidebox-ft" className="mck-box-ft">
                <div className="mck-box-form mck-row n-vis">
                  <div className="blk-lg-12">
                    <p id="mck-msg-error" className="mck-sidebox-error n-vis" />
                  </div>
                  <div id="mck-msg-response" className="blk-lg-12 mck-box-response n-vis">
                    <div id="mck-response-text" className="response-text" />
                  </div>
                  <div className="blk-lg-12">
                    <form id="mck-msg-form" className="vertical mck-msg-form">
                      <div className="mck-form-group n-vis">
                        <label className="sr-only placeholder-text control-label" htmlFor="mck-msg-to">To:</label> <input className="mck-form-cntrl" id="mck-msg-to" name="mck-msg-to" placeholder="To" required />
                      </div>
                      <div id="mck-reply-to-div" className="n-vis">
                        <button type="button" id="close" className="mck-box-close mck-close-panel move-right">
                          <span aria-hidden="true">×</span>
                        </button>
                        <div id="mck-reply-to" className=" mck-msgto " />
                        <div id="mck-reply-msg"> </div>
                      </div>
                      <div className="mck-form-group last last-child">
                        <label className="sr-only placeholder-text control-label" htmlFor="mck-textbox">Message</label>
                        <div id="mck-textbox-container" className="mck-textbox-container">
                          <div className="mck-blk-2 mck-text-box-panel move-left">
                            <div className="mck-blk-12">
                              <button type="button" id="mck-btn-smiley" className="mck-btn mck-btn-smiley mck-btn-text-panel" title="Smiley">
                                <span className="mck-icon-smiley-blue" />
                              </button>
                            </div>
                          </div>
                          <div className="mck-blk-2 mck-text-box-panel mck-mid-panel move-left">
                            <div id="mck-attachmenu-box" className="mck-attach-menu">
                              <div id="mck-btn-attach" className="mck-dropdown-toggle mck-btn-attach mck-file-attach-label mck-btn mck-btn-text-panel" data-toggle="mckdropdown" aria-expanded="true" title="Attach File">
                                <span className="mck-icon-upload" />
                              </div>
                              <ul id="mck-upload-menu-list" className="mck-dropup-menu mck-upload-menu-list mck-menu-right" role="menu">
                                <li><a id="mck-file-up" href="#" className="mck-file-upload menu-item" title="File & Photos">
                                    <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-photo.png" className="menu-icon" alt="File & Photos" /><span id="mck-file-up-label">Files &amp; Photos</span>
                                  </a></li>
                                <li><a id="mck-btn-loc" href="#" className="menu-item mck-btn-loc" title="Share Location">
                                    <div className="mck-menu-icon">
                                      <span className="mck-icon-marker-blue" />
                                    </div> <span id="mck-share-loc-label">Share Location</span>
                                  </a></li>
                              </ul>
                            </div>
                            <div id="mck-attachfile-box" className="mck-blk-12 n-vis">
                              <button id="mck-file-up2" type="button" className="mck-file-upload mck-file-attach-label mck-btn mck-btn-text-panel" title="Attach File">
                                <span className="mck-icon-upload" />
                              </button>
                            </div>
                          </div>
                          <div id="mck-text-box" contentEditable="true" className="mck-blk-8 mck-text-box mck-text required" />
                          <div className="mck-blk-2 mck-text-box-panel move-right">
                            <div className="mck-blk-12">
                              <button type="submit" id="mck-msg-sbmt" className="mck-btn mck-btn-text-panel" title="Send Message">
                                <span className="mck-icon-send" />
                              </button>
                            </div>
                          </div>
                          <input id="mck-file-input" className="mck-file-input n-vis" type="file" name="files[]" />
                          <div id="mck-file-box" className="n-vis" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div id="mck-contacts-content" className="mck-contacts-content mck-text-center">
                  <button type="button" id="mck-msg-new" className="mck-contact-search mck-btn mck-btn-blue" title="Start New">
                    <span>Start New</span>
                  </button>
                </div>
              </div>
              <div className="mck-running-on n-vis">
                <a href="https://www.applozic.com" target="_blank"><span className="n-vis">Applozic Chat SDK</span><strong>Powered by
                    Applozic</strong></a>
              </div>
            </div>
            <div id="mck-sidebox-search" className="mck-sidebox-search mck-sidebox-content mck-box-content n-vis">
              <div className="mck-box-top">
                <div className="mck-tab-link blk-lg-4">
                  <a href="#" role="link" className="mck-conversation-tab-link"><span className="mck-icon-backward" /></a>
                </div>
                <div className="blk-lg-5">
                  <div className="mck-box-title mck-truncate" title="Start New">Start
                    New</div>
                </div>
                <div className="blk-lg-3 move-right mck-start-new-menu-item mck-tab-menu-box">
                  <div className="mck-dropdown-toggle" data-toggle="mckdropdown" aria-expanded="true">
                    <img src="https://apps.applozic.com/resources/sidebox/css/app/images/icon-menu.png" alt="Tab Menu" />
                  </div>
                  <ul id="mck-start-new-menu-list" className="mck-dropdown-menu  menu-right" role="menu">
                    <li><a href="#" id="mck-new-group" className="mck-new-group-button menu-item" title="Create Group">Create
                        Group</a></li>
                  </ul>
                </div>
              </div>
              <div id="mck-search-tab-box" className="mck-search-tab-box mck-row">
                <div className="blk-lg-12">
                  <ul className="mck-nav mck-nav-panel">
                    <li className="mck-nav-item mck-nav-divider"><a id="mck-contact-search-tab" className="mck-nav-link mck-contact-search active" href="#"><strong>Contacts</strong></a></li>
                    <li className="mck-nav-item"><a id="mck-group-search-tab" className="mck-nav-link mck-group-search" href="#"><strong>Groups</strong></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mck-box-top mck-search-box-top">
                <div id="mck-contact-search-input-box" className="mck-input-group blk-lg-12">
                  <input id="mck-contact-search-input" type="text" data-provide="typeahead" placeholder="Search..." autofocus /> <span className="mck-search-icon"><a href="#" role="link" className="mck-contact-search-link"><span className="mck-icon-search" /></a></span>
                </div>
                <div id="mck-group-search-input-box" className="mck-input-group blk-lg-12 n-vis">
                  <input id="mck-group-search-input" type="text" data-provide="typeahead" placeholder="Search..." autofocus /> <span className="mck-search-icon"><a href="#" role="link" className="mck-group-search-link"><span className="mck-icon-search" /></a></span>
                </div>
              </div>
              <div className="mck-box-body">
                <div id="mck-search-cell" className="mck-tab-cell">
                  <div className="mck-message-inner">
                    <ul id="mck-contact-search-list" className="mck-contact-search-list mck-contact-list mck-nav mck-nav-tabs mck-nav-stacked" />
                    <ul id="mck-group-search-list" className="mck-contact-list mck-group-search-list mck-nav mck-nav-tabs mck-nav-stacked n-vis" />
                    <div id="mck-no-search-groups" className="mck-no-data-text mck-text-muted n-vis">No groups
                      yet!</div>
                    <div id="mck-no-search-contacts" className="mck-no-data-text mck-text-mutedn n-vis">No contacts
                      yet!</div>
                    <div id="mck-search-loading" className="mck-loading n-vis">
                      <img src="https://apps.applozic.com/resources/sidebox/css/app/images/ring.gif" alt="Loading" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="mck-group-create-tab" className="mck-group-create-tab mck-sidebox-content mck-box-content n-vis">
              <div className="mck-box-top">
                <div className="mck-tab-link blk-lg-4">
                  <a id="mck-search-tab-link" href="#" role="link" className="mck-contact-search"><span className="mck-icon-backward" />
                  </a>
                </div>
                <div className="blk-lg-8">
                  <div className="mck-box-title mck-truncate" title="Create Group">Create
                    Group</div>
                </div>
              </div>
              <div className="mck-box-body">
                <div className="mck-tab-cell">
                  <div id="mck-group-create-panel" className="mck-tab-panel mck-message-inner mck-group-create-inner">
                    <div className="mck-group-sub-sec">
                      <div id="mck-group-create-icon-box" className="mck-group-create-icon-box mck-group-icon-box mck-hover-on">
                        <div className="mck-group-icon" />
                        <span className="mck-overlay-box">
                          <div className="mck-overlay">
                            <span className="mck-camera-icon" /> <span id="mck-gc-overlay-label" className="mck-overlay-label">Add
                              Group Icon</span>
                          </div>
                          <div id="mck-group-create-icon-loading" className="mck-loading n-vis">
                            <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-loading.gif" alt="Loading" />
                          </div> <input id="mck-group-icon-upload" className="mck-group-icon-upload n-vis" type="file" name="files[]" />
                        </span>
                      </div>
                    </div>
                    <div id="mck-group-create-name-sec" className="mck-group-sub-sec">
                      <div id="mck-group-create-name-box" className="mck-row mck-group-name-box">
                        <div className="blk-lg-12">
                          <div id="mck-gc-title-label" className="mck-label">Group
                            Title</div>
                        </div>
                        <div className="blk-lg-12">
                          <div id="mck-group-create-title" className="mck-group-create-title mck-group-title" contentEditable="true">Group title</div>
                        </div>
                      </div>
                    </div>
                    <div id="mck-group-create-type-sec" className="mck-group-sub-sec">
                      <div id="mck-group-create-type-box" className="mck-row mck-group-type-box">
                        <div className="blk-lg-12">
                          <div id="mck-gc-type-label" className="mck-label">Group Type</div>
                        </div>
                        <div className="blk-lg-12">
                          <select id="mck-group-create-type" className="mck-select">
                            <option value={2} selected>Public</option>
                            <option value={1}>Private</option>
                            <option value={6}>Open</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div id="mck-group-create-btn-sec" className="mck-group-sub-sec">
                      <button type="button" id="mck-btn-group-create" className="mck-btn mck-btn-green mck-btn-group-create" title="Create Group">Create Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="mck-group-info-tab" className="mck-group-info-tab mck-sidebox-content mck-box-content">
              <div className="mck-box-top">
                <div className="mck-tab-link blk-lg-4">
                  <a id="mck-group-back-link" href="#" role="link" className="mck-group-back-link"> <span className="mck-icon-backward" />
                  </a>
                </div>
                <div className="blk-lg-8">
                  <div className="mck-box-title mck-truncate" title="Group Info">Group
                    Info</div>
                </div>
              </div>
              <div id="mck-group-info-panel" className="mck-tab-panel mck-group-info-panel">
                <div className="mck-group-icon-sec">
                  <div id="mck-group-info-icon-box" className="mck-group-icon-box mck-group-info-icon-box mck-hover-on">
                    <div className="mck-group-icon" />
                    <span className="mck-overlay-box n-vis">
                      <div className="mck-overlay">
                        <span className="mck-camera-icon" /> <span id="mck-gi-overlay-label" className="mck-overlay-label">Change
                          Group Icon</span>
                      </div>
                      <div id="mck-group-info-icon-loading" className="mck-loading vis">
                        <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-loading.gif" alt="Loading" />
                      </div> <input id="mck-group-icon-change" className="mck-group-icon-change n-vis" type="file" name="file[]" />
                    </span>
                  </div>
                  <div className="mck-text-center">
                    <a id="mck-btn-group-icon-save" href="#" role="link" className="mck-btn-group-icon-save n-vis" title="Save">
                      <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-save.png" alt="Save" />
                    </a>
                  </div>
                </div>
                <div id="mck-group-name-sec" className="mck-group-name-sec">
                  <div id="mck-group-name-box" className="mck-row mck-group-name-box">
                    <div className="blk-lg-9">
                      <div id="mck-group-title" className="mck-group-title" contentEditable="false">Group title</div>
                    </div>
                    <div className="blk-lg-3 mck-group-name-edit-icon">
                      <a id="mck-group-name-edit" href="#" role="link" className="mck-group-name-edit vis" title="Edit"> <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-write.png" alt="Edit" /></a> <a id="mck-group-name-save" href="#" role="link" className="mck-group-name-save n-vis" title="Save"> <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-save.png" alt="Save" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div id="mck-group-member-panel" className="mck-tab-panel mck-group-member-panel vis">
                <div className="mck-group-md-sec">
                  <div id="mck-group-member-title" className="mck-row mck-group-member-text">Members</div>
                  <div id="mck-group-add-member-box" className="mck-row mck-group-admin-options mck-group-add-member-box n-vis">
                    <a id="mck-group-add-member" className="mck-group-add-member" href="#">
                      <div className="blk-lg-3">
                        <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-add-member.png" alt="Add Member" />
                      </div>
                      <div className="blk-lg-9">Add Member</div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mck-box-body">
                <div className="mck-tab-cell">
                  <div className="mck-group-member-inner">
                    <ul id="mck-group-member-list" className="mck-group-member-list mck-contact-list mck-nav mck-nav-tabs mck-nav-stacked">
                    </ul>
                  </div>
                </div>
              </div>
              <div id="mck-group-update-panel" className="mck-tab-panel mck-group-update-panel n-vis">
                <div className="mck-group-bottom-sec">
                  <div className="mck-row mck-group-update-sec">
                    <button type="button" id="mck-btn-group-update" className="mck-btn mck-btn-green mck-btn-group-update" title="Update">Update</button>
                  </div>
                </div>
              </div>
              <div id="mck-group-info-ft" className="mck-group-info-ft">
                <button type="button" id="mck-btn-group-exit" className="mck-btn mck-btn-blue mck-btn-group-exit" title="Exit Group">Exit
                  Group</button>
              </div>
            </div>
          </div>
        </div>
        <div id="mck-loc-box" className="mck-box mck-loc-box fade" aria-hidden="false">
          <div className="mck-box-dialog mck-box-md">
            <div className="mck-box-content">
              <div className="mck-box-top mck-row">
                <div className="blk-lg-10">
                  <h4 className="mck-box-title">Share Location</h4>
                </div>
                <div className="blk-lg-2">
                  <button type="button" className="mck-box-close" data-dismiss="mckbox" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div className="mck-box-body">
                <div className="mck-form-group">
                  <div className="blk-lg-12">
                    <input id="mck-loc-address" type="text" className="mck-form-control" placeholder="Enter a location" autoComplete="off" />
                  </div>
                </div>
                <div id="mck-map-content" className="mck-loc-content" />
                <div className="n-vis">
                  <label className="blk-sm-2 mck-control-label">Lat.:</label>
                  <div className="blk-sm-3">
                    <input type="text" id="mck-loc-lat" className="mck-form-control" />
                  </div>
                  <label className="blk-sm-2 mck-control-label">Long.:</label>
                  <div className="blk-sm-3">
                    <input type="text" id="mck-loc-lon" className="mck-form-control" />
                  </div>
                </div>
              </div>
              <div className="mck-box-footer">
                <button id="mck-my-loc" type="button" className="mck-my-loc mck-btn mck-btn-green">My Location</button>
                <button id="mck-loc-submit" type="button" className="mck-btn mck-btn-blue mck-loc-submit move-right">Send</button>
                <button id="mck-btn-close-loc-box" type="button" className="mck-btn mck-btn-default move-right" data-dismiss="mckbox">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div id="mck-gm-search-box" className="mck-box mck-gm-search-box fade" aria-hidden="false">
          <div className="mck-box-dialog mck-box-sm">
            <div className="mck-box-content">
              <div className="mck-box-top mck-row">
                <div className="blk-lg-3">
                  <img src="https://apps.applozic.com/resources/sidebox/css/app/images/mck-icon-add-member.png" alt="Add Member" />
                </div>
                <div className="blk-lg-7">
                  <h4 className="mck-box-title">Add Member</h4>
                </div>
                <div className="blk-lg-2">
                  <button type="button" className="mck-box-close" data-dismiss="mckbox" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div className="mck-box-body">
                <div className="mck-form-group">
                  <div className="mck-input-group blk-lg-12">
                    <input id="mck-group-member-search" type="text" data-provide="typeahead" placeholder="Search..." autofocus /> <span className="mck-search-icon"><a href="#" role="link" className="mck-group-member-search-link"><span className="mck-icon-search" /></a></span>
                  </div>
                </div>
                <div className="mck-tab-cell">
                  <div className="mck-message-inner">
                    <ul id="mck-group-member-search-list" className=" mck-contact-list mck-group-member-search-list mck-nav mck-nav-tabs mck-nav-stacked" />
                    <div id="mck-no-gsm-text" className="mck-no-data-text mck-text-muted n-vis">No contacts
                      yet!</div>
                  </div>
                  <div id="mck-gms-loading" className="mck-loading n-vis">
                    <img src="https://apps.applozic.com/resources/sidebox/css/app/images/ring.gif" alt="Loading" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
