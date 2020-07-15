<template>
  <div class="form">
    <div v-show="contentShow">
      <div class="zhanwei"></div>

      <!-- <header>
        <div v-waves2 class="left" @click="$goBack();">
          <i class="iconfont icon-icon_left"></i>
          {{pageSet.cancelTxy}}
        </div>
        <div class="page-title">
          {{pageSet.pageTitle}}
        </div>
        <div v-waves2 class="page-title page-title-right" @click="submit">
          确定
        </div>
      </header> -->
      <header>
        <div class="flex_bewteen">
          <div v-waves2 class="table_wrap left" @click="$goBack();">
            <i class="table_txt iconfont icon-icon_left"></i>
            <div class="table_txt">返回</div>
          </div>
          <div class="table_wrap">
            <div class="table_txt page-title">
              {{pageSet.pageTitle}}
            </div>
          </div>
          <div v-waves2 class="mt_1 page-title page-title-right" @click="submit">
            确定
          </div>
        </div>
      </header>

      <div v-for="(item,index) in listFilter(controls)" :key="index">
        <template v-if="item.ctl_type === 'group'">
          <div class="basic classGroup" :style="{backgroundColor: item.ctl_bkcolor, margin: item.ctl_margin, padding: item.ctl_padding, }">
            <div class="flex_row">
              <div class="flex_row groupTitle"
                :style="{height: item.ctl_bar_height,  borderLeftColor: item.ctl_bar_color, borderLeftWidth: item.ctl_bar_width,
                paddingLeft: item.ctl_spacing,
                }">
                <span class="flex_row classTitle"
                  :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'),
                  fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }"
                >
                  {{item.ctl_title}}
                </span>
              </div>
            </div>
            <div :style="{color: item.ctl_subtitle_color, fontSize: item.ctl_subtitle_size, fontStyle: (item.ctl_subtitle_italic ? 'italic':'normal'),
              fontWeight: (item.ctl_subtitle_bold ? 'bold':'normal'), }">
              {{item.ctl_subtitle || ""}}
            </div>
          </div>
        </template>


        <template v-else-if="item.ctl_type === 'show_text'">
          <div class="basic classShow" :style="{backgroundColor: item.text_bkcolor, padding: item.ctl_margin}">
            <span class="preWrap" :style="{color: item.text_color, backgroundColor: item.text_bkcolor, fontSize: item.text_size+'px',
              fontStyle: (item.text_italic ? 'italic':'normal'), fontWeight: (item.text_bold ? 'bold':'normal'), textAlign: item.text_align,
              width: '100%', whiteSpace: 'pre-wrap',}">
              {{item.ctl_value}}
            </span>
          </div>
        </template>

        <template v-else-if="item.ctl_type === 'show_image'">
          <div class="basic classShow" :style="{padding: item.ctl_margin}">
            <van-image width="100%" :src="item.ctl_value" />
          </div>
        </template>

        <template v-else-if="item.ctl_type === 'separator'">
          <div class="van-separator"
            :style="{margin: item.ctl_margin, borderWidth: item.height, borderBottomStyle: item.linetype, borderColor: item.color,}">
          </div>
          <div class="padding-box" :style="{margin: item.ctl_margin, marginTop: '0', }"></div>
        </template>

        <template v-else-if="item.ctl_type === 'editbox' && item.ctl_data.multiline === true">
          <div class="border_box" :style="{margin: item.ctl_margin, padding: item.ctl_padding, }">
            <div class="basic h140">
              <div class="flex_row">
                <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                  fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                  {{item.ctl_title}}
                </span>
                <span class="notNull" v-show="item.ctl_notnull">*</span>
              </div>
              <i class="iconfont my-icon" :class="item.ctl_icon"  v-if="item.ctl_icon"></i>
            </div>
            <div class="mutil-box" :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size, 
              fontStyle: (item.ctl_value_italic ? 'italic':'normal'), fontWeight: (item.ctl_value_bold ? 'bold':'normal')}">
              <van-field
                v-model="item.ctl_data.value"
                type="textarea"
                :placeholder="item.ctl_placeholder"
                :readonly="item.ctl_readonly"
                :required="!item.notNull"
                :show-word-limit="item.ctl_data.maxsize !== 'hideLimit'"
                :maxlength="item.ctl_data.maxsize"
                :error-message="item.placeholder"
                autosize
                clearable
                @focus="textAreaFocus(item)"
                @blur="textAreaBlur(item)"
              />
            </div>
          </div>
        </template>

        <template v-else-if="item.ctl_type === 'editbox'">
          <div class="basic h140" :style="{margin: item.ctl_margin, padding: item.ctl_padding, }">
            <div class="flex_row">
              <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                {{item.ctl_title}}
              </span>
              <span class="notNull" v-show="item.ctl_notnull" :style="{fontSize: item.ctl_title_size,}">*</span>
              <span class="tipNum" v-show="item.ctl_data.maxsize && item.ctl_data.maxsize !== 'hideLimit' && item.ctl_data.value_type === 0" >
                {{item.ctl_data.value.length || 0}}/{{item.ctl_data.maxsize}}
              </span>
            </div>
            <div class="edit-box" :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size, 
              fontStyle: (item.ctl_value_italic ? 'italic':'normal'), fontWeight: (item.ctl_value_bold ? 'bold':'normal')}">
              <van-field
                v-model="item.ctl_data.value"
                :type="item.ctl_data.value_type"
                :placeholder="item.ctl_placeholder"
                :disabled="item.ctl_readonly"
                @focus="editboxFocus(item)"
                @blur="editboxBlur(item)"
                @input="val => editboxInput(val, item)"
                :ref="'editbox' + index"
              />
              <!-- <input class="ctlInput"
                v-model="item.ctl_data.value"
                :type="item.ctl_data.value_type"
                :placeholder="item.ctl_placeholder"
                :disabled="item.ctl_readonly"
                @focus="editboxFocus(item)"
                @blur="editboxBlur(item)"
                @input="val => editboxInput(val, item)"
              />
              <i class="iconfont my-icon" :class="item.ctl_icon" v-if="item.ctl_icon"></i>
              <i class="iconfont my-icon icon-arrow-right-copy-copy-copy" v-if="!item.ctl_icon && item.ctl_type === 'combox' && item.ctl_data && item.ctl_data.user_defined"></i>
            -->
            </div>
            <div>
              <span v-waves2 @click="clearEditbox(item, index)"><i class="iconfont my-icon" :class="item.ctl_icon" v-if="item.ctl_icon"></i></span>
              <i class="iconfont my-icon icon-arrow-right-copy-copy-copy" v-if="!item.ctl_icon && item.ctl_type === 'combox' && item.ctl_data && item.ctl_data.user_defined"></i>
            </div>
          </div>
        </template>

        <template v-else-if="(item.ctl_type === 'combox')">
          <div v-waves2 class="basic h140" @click="clickHandler(item, 'onCombox')" :style="{margin: item.ctl_margin, padding: item.ctl_padding, }">
            <div class="flex_row">
              <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                {{item.ctl_title}}
              </span>
              <span class="notNull" v-show="item.ctl_notnull">*</span>
            </div>
            <div class="edit-box" :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size, 
              fontStyle: (item.ctl_value_italic ? 'italic':'normal'), fontWeight: (item.ctl_value_bold ? 'bold':'normal')}">
              <van-field
                v-model="item.ctl_data.value"
                :type="item.ctl_data.value_type"
                :placeholder="item.ctl_placeholder"
                :disabled="item.ctl_readonly"
                @focus="editboxFocus(item)"
                @blur="editboxBlur(item)"
                @input="val => editboxInput(val, item)"
                :ref="'editbox' + index"
              />
            </div>
            <div>
              <span v-waves2 @click="clearEditbox(item, index)"><i class="iconfont my-icon" :class="item.ctl_icon" v-if="item.ctl_icon"></i></span>
              <i class="iconfont my-icon icon-arrow-right-copy-copy-copy" v-if="!item.ctl_icon && item.ctl_type === 'combox' && item.ctl_data && item.ctl_data.user_defined"></i>
            </div>
          </div>
        </template>

        <template v-else-if="(item.ctl_type === 'date')">
          <div v-waves2 class="basic h140" @click="clickHandler(item, item.funcName)" :style="{margin: item.ctl_margin, padding: item.ctl_padding, }">
            <div>
              <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                {{item.ctl_title}}
              </span>
            </div>
            <div class="flexC">
              <input
                class="ctlInput w450"
                v-model="item.ctl_data.value"
                :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size, 
                fontStyle: (item.ctl_value_italic ? 'italic':'normal'), fontWeight: (item.ctl_value_bold ? 'bold':'normal')}"
                :placeholder="item.ctl_placeholder"
                readonly
              />
              <i class="iconfont my-icon icon-arrow-right-copy-copy-copy"></i>
            </div>
          </div>
        </template>

        <template v-else-if="item.ctl_type === 'tag'" :style="{margin: item.ctl_margin, padding: item.ctl_padding, }">
          <div class="border_box" :style="{margin: item.ctl_margin, padding: item.ctl_padding }">
            <div class="basic h140 tag-wrap">
              <div  class="flex_row">
                <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                  fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                  {{item.ctl_title}}
                </span>
                <span class="notNull" v-show="item.ctl_notnull">*</span>
              </div>
              <div>
                <!-- <van-field
                  type="text"
                  :style="{color: item.ctl_placeholder_color, fontSize: item.ctl_placeholder_size,
                  fontStyle: (item.ctl_placeholder_italic ? 'italic':'normal'), fontWeight: (item.ctl_placeholder_bold ? 'bold':'normal'), }"
                  :placeholder="item.ctl_placeholder"
                  :disabled="item.ctl_readonly"
                  @keyup.enter="e => clickHandler(item, 'addTag', e)"
                /> -->
                <div class="tag-tip">{{item.ctl_data.user_defined ? '请选择或录入标签' : '请选择标签'}}</div>
              </div>
            </div>
            <div class="basic tag-box">
              <template v-for="(tagItem, tagIndex) in item.arr">
                <div
                  v-waves2
                  class="tag-class"
                  :key="tagIndex"
                  :class="tagItem.checked ? 'tag-checked' : ''"
                  :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size,  marginBottom: item.ctl_spacing , marginRight: item.ctl_spacing ,
                  fontStyle: (item.ctl_value_italic ? 'italic':'normal'), fontWeight: (item.ctl_value_bold ? 'bold':'normal'), borderRadius: item.ctl_value_radius,
                  paddingLeft: item.ctl_value_radius, paddingRight: item.ctl_value_radius, color: tagItem.checked ? item.ctl_value_color_select : item.ctl_value_color,
                  backgroundColor: tagItem.checked ? item.ctl_value_bkcolor_select : item.ctl_value_bkcolor,}"
                  @click="clickHandler(item, 'toggleTag', tagItem.name)"
                >
                  {{tagItem.name}}
                </div>
              </template>
              <div
                v-if="item.ctl_data.user_defined"
                @click="clickHandler(item, 'onTagBox')"
                class="tag-class"
                :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size,  marginBottom: item.ctl_spacing , marginRight: item.ctl_spacing ,
                fontStyle: (item.ctl_value_italic ? 'italic':'normal'), fontWeight: (item.ctl_value_bold ? 'bold':'normal'), borderRadius: item.ctl_value_radius,
                paddingLeft: item.ctl_value_radius, paddingRight: item.ctl_value_radius, color: item.ctl_value_bkcolor_select,
                backgroundColor: item.ctl_value_bkcolor,}"
              >
                手动录入标签
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="item.ctl_type === 'edithtml'">
          <div class="border_box" :style="{margin: item.ctl_margin, padding: item.ctl_padding }">
            <div v-waves2 class="basic h140" @click="clickHandler(item, 'onHtmlnBox')">
              <div>
                <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                  fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                  {{item.ctl_title}}
                </span>
              </div>
              <div class="html-box">
                <span class="tip-right" :style="{color: item.ctl_placeholder_color, fontSize: item.ctl_placeholder_size,
                  fontStyle: (item.ctl_placeholder_italic ? 'italic':'normal'), fontWeight: (item.ctl_placeholder_bold ? 'bold':'normal'), }">
                  {{item.ctl_data.value ? '点击这里修改内容' : ''}}
                </span>
                <i class="iconfont my-icon" :class="item.ctl_icon"  v-if="item.ctl_icon"></i> 
              </div>
            </div>
            <div class="basic html-text-box" v-if="item.hasNew" v-html="item.ctl_data.value "></div>
          </div>
        </template>

        <template v-else-if="(item.ctl_type === 'images')">
          <div class="border_box" :style="{margin: item.ctl_margin, padding: item.ctl_padding }">
            <div class="basic h140">
              <div>
                <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                  fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                  {{item.ctl_title}}
                </span>
              </div>
              <i class="iconfont my-icon" :class="item.ctl_icon"  v-if="item.ctl_icon"></i>
            </div>
            <div class="upload-box">
              <van-uploader
                v-model="item.ctl_data.value"
                :deletable="!item.ctl_readonly"
                :show-upload="!item.ctl_readonly"
                multiple accept="image/*"
                :after-read="file => imagesReader(file, item)"
              />
            </div>
          </div>
        </template>

        <template v-else-if="(item.ctl_type === 'files')">
          <div class="border_box" :style="{margin: item.ctl_margin, padding: item.ctl_padding }">
            <div class="basic h140">
              <div>
                <span class="basicTitle" :style="{color: item.ctl_title_color, fontSize: item.ctl_title_size, fontStyle: (item.ctl_title_italic ? 'italic':'normal'), 
                  fontWeight: (item.ctl_title_bold ? 'bold':'normal'), }">
                  {{item.ctl_title}}
                </span>
              </div>
              <i class="iconfont my-icon" :class="item.ctl_icon"  v-if="item.ctl_icon"></i>
            </div>
            <template v-for="(file, fileIndex) in item.ctl_data.value" >
              <div class="flex_row name-box" :key="fileIndex" :style="{marginTop: item.ctl_spacing, marginBottom: item.ctl_spacing, }" >
                <div class="name-icn-box">
                  <svg class="icon name-icn" aria-hidden="true">
                    <use :xlink:href="file.icn"></use>
                  </svg>
                </div>
                <div class="flex_row file-name-box" :style="{color: item.ctl_value_color, fontSize: item.ctl_value_size, fontStyle: (item.ctl_value_italic ? 'italic':'normal'), 
                  fontWeight: (item.ctl_value_bold ? 'bold':'normal'), }">
                  <span class="name-icn-box">
                    <span class="name-icn">{{file.name}}.{{file.type}}</span>
                  </span>
                  <span class="flex_row file-type" @click="deleteFile(item, fileIndex)">
                    <i class="van-icon van-icon-clear van-uploader__preview-delete"></i>
                  </span>
                </div>
                <div class="separator-box">
                  <div class="van-separator"
                    :style="{margin: item.ctl_value_line_margin, borderWidth: item.ctl_value_lineheight, borderBottomStyle: item.ctl_value_linetype,
                    borderColor: item.ctl_value_linecolor,}">
                  </div>
                  <div class="padding-box" :style="{margin: item.ctl_value_line_margin, marginTop: '0', }"></div>
                </div>
              </div>
            </template>
            <div class="upload-box upload-file-box">
              <van-uploader
                v-model="item.ctl_data.value"
                multiple
                :after-read="file => filesReader(file, item)"
              >
                <template>
                  <div class="upload_f_txt">
                    <div class="icon_f_box"><i class="iconfont upload-f-icon icon-icon_add"></i></div>
                    选择你要上传的文件
                  </div>
                </template>
              </van-uploader>
            </div>
          </div>
        </template>

      </div>

    </div>

    <noContent contText="表单中心" v-show="!contentShow" ></noContent>

    <van-popup v-model="hasCombox" position="bottom">
      <div class="basic h90">
        <div v-waves2 class="btn" @click="hideCombox">取消</div>
        <div v-if="comboxItem.ctl_title" class="comboxTitle">{{comboxItem.ctl_title}}</div>
        <div v-waves2 class="btn" @click="hideCombox">确认</div>
      </div>
      <van-checkbox-group v-model="comboxItem.values" checked-color="#669900">
        <van-cell-group>
          <van-cell
            v-waves2
            v-for="(item, index) in comboxItem.ctl_data.options"
            clickable
            :key="item.value"
            :title="item.label || 'nolabel'"
            @click="comboxToggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item.value || 'nolabel'" icon-size="21"	 ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <van-popup v-model="hasTimePicker" position="bottom">
      <van-datetime-picker
        v-model="timeItem.ctlTime"
        :title="timeItem.ctl_title"
        :type="timeItem.ctl_data.value_type"
        :formatter="formatter"
        @change="changeTimePicker"
        @confirm="confirmTimePicker"
        @cancel="cancelTimePicker"
      />
    </van-popup>

    <van-popup v-model="hasAreaPicker" position="bottom">
      <regionPicker
        :title="regionItem.ctl_title"
        :type="regionItem.ctl_data.value_type"
        @confirm="areaPickerConfirm"
      />
    </van-popup>

    <van-popup v-model="hasHtmlBox" position="bottom">
      <div class="edit-html-box">
        <div class="basic h90">
          <div class="btn" @click="hideHtmlBox">取消</div>
          <div v-if="htmlItem.ctl_title" class="comboxTitle">{{htmlItem.ctl_title}}</div>
          <div class="btn" @click="confirmHtmlBox">确认</div>
        </div>
        <quill-editor
          v-model="htmlItem.ctl_data.value"
          :options="htmlOption"
          ref="myQuillEditor"
        >
        </quill-editor>
      </div>
    </van-popup>

    <van-popup v-model="hasMapBox" position="bottom">
      <div class="edit-html-box">
        <div class="basic h90">
          <div class="btn" @click="hideMapBox">返回</div>
          <div v-if="mapItem.ctl_title" class="comboxTitle">{{mapItem.ctl_title}}</div>
          <div class="btn" @click="confirmMapBox">确认</div>
        </div>
        <iframe class="map-item" id="getAddress" @load="loadiframe"
          src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
        >
        </iframe>
      </div>
    </van-popup>

    <van-number-keyboard
      v-model="keyboardItem.ctl_data.vallue"
      :show="keyboardShow"
      @blur="keyboardShow = false"
      @delete="onDelete(keyboardItem)"
    />

    <van-popup v-model="hasTagBox" position="bottom">
      <div class="add-tag-box">
        <van-field
          v-model="tagAddTxt"
          autofocus
          center
          placeholder="手动录入标签"
        >
          <template #button>
            <van-button size="small" plain type="primary" color="#690" @click="addTagTxt">完成</van-button>
          </template>
        </van-field>
      </div>
    </van-popup>

  </div>
</template>

<script>
import noContent from "@/components/noContent";
import regionPicker from "@/components/areaPicker";
import tools from "@/utils/tool"
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { showToast } from '@/utils/jsBridge'

export default {
  name: "formEdit",
  components: {
    noContent,
    regionPicker,
    quillEditor,
  },
  data() {
    return {
      pageSet: { pageTitle: "新建客户", cancelTxy: "返回", type: "edit", add_next: false, submit: "" },
      comboxItem: { ctl_data: { options: [], value: [] }, values: [], },
      keyboardShow: false,
      keyboardItem: { ctl_data: { value: null } },
      hasTagBox: false,
      hasCombox: false,
      hasTimePicker: false,
      hasAreaPicker: false,
      hasHtmlBox: false,
      hasMapBox: false,
      timeItem: { ctlTime: new Date(), ctl_data: { value_type: "date", value: null } },
      regionItem: { ctl_data: { value: null } },
      htmlItem: { ctl_data: { value: null } },
      mapItem: { ctl_data: { value: null } },
      tagItem: { ctl_data: { value: null } },
      tagAddTxt: '',
      htmlOption: {
        theme: "snow", //注意样式问题
        placeholder: "开始创作……",
        debug: false,
        modules: {
          // 自定义菜单栏
          toolbar: {
            container: [
              [
                { color: [] },
                { header: [1, 2, 3, 4, 5, 6, false] },
                { align: [] },
                { list: 'bullet' },
                "bold",
                "blockquote",
                "image"
              ], 
            ],
              //自定义按钮事件，我这里自定义了image的上传方式
            handlers: {
              // image: value => {
              //   console.log("image vallue", value);
              //   // if (value) {
              //   //   this.upload_type = 1;
              //   //   this.$refs.upload.click();
              //   // } else {
              //   //   this.quill.format("image", false);
              //   // }
              // }
            }
          },
        }
      },
      controls: [],
      contentShow:true,
      mapName: "",
    };
  },
  watch: {
  },
  methods: {
    listFilter(list) {
      let newList = list.filter(e => (e.ctl_visible === true || e.ctl_type === "show_text" || e.ctl_type === "show_image"));
      const funcNameArr = { date: 'onDateBox', region: 'onRegionBox',  address: 'onMapBox' }
      newList.map(e => {
        if(e.isFirst) return e;
        if(e.ctl_type === "combox"){
          e.ctl_data.options =  e.ctl_data.options || [];
          // e.ctl_data.value = (e.ctl_data.value && e.ctl_data.value.split(",")) || [];   valueArr labelArr
          const value = e.ctl_data.value;
          console.log('combox value', value)
          if(value) {
            const valueArr = (value && value.split(',')) || [];
            const options = e.ctl_data.options || [];
            const labelArr = valueArr.map(datavalue => options.find(op => op.value === datavalue).label);
            e.ctl_data.value = labelArr.join(',');
          }
          const reg = {'mobile': '^1\d{10}$', 'tel': '', 'idcard': '', 'number': '', 'decimal': '', 'email': '', 'website': '',};
        } else if(e.ctl_type === 'date' || e.ctl_type === 'region' || e.ctl_type === 'address') {
          e.funcName = funcNameArr[e.ctl_type ];
          e.ctl_type = 'date';
        } else if(e.ctl_type === 'editbox' && e.ctl_data && e.ctl_data.maxsize) {
          e.ctl_data.maxsizeOld = JSON.parse(JSON.stringify(e.ctl_data.maxsize));
          e.ctl_data.maxsize = 'hideLimit';
          if(e.ctl_data.value_type === 'mobile') {
            e.ctl_data.value_type  = 'tel'
          } else if(e.ctl_data.value_type === 'decimal') {
            e.ctl_data.value_type  = 'number'
          } 
        } else if(e.ctl_type === 'images'|| e.ctl_type === 'image') {
          const valueStr = (e.ctl_data && e.ctl_data.value ) || "";
          console.log("valueStr", valueStr)
          console.log("e ctl_type", e.ctl_type)
          e.newValue = valueStr;
          let strArr = (valueStr && valueStr.split(";")) || [];
          strArr = strArr.filter(str => str.length > 10);
          e.ctl_data.value = strArr.map(imgUrl => {
            return { url: imgUrl } 
          });
          if(e.ctl_type === 'image') {
            console.log("e.can_edit", e.can_edit);
            console.log("e", e);
            e.accept = e.ctl_data.can_edit ? 'image/png' : 'image/jpeg';
          }
        } else if(e.ctl_type === 'files') {
          const icnMap = 
          {
            'xls': '#icon-yunpanlogo-', 'xlsx': '#icon-yunpanlogo-', 'ppt': '#icon-yunpanlogo-1', 'pptx': '#icon-yunpanlogo-1',
            'jpg': '#icon-yunpanlogo-14', 'png': '#icon-yunpanlogo-14', 'jpeg': '#icon-yunpanlogo-14', 'gif': '#icon-yunpanlogo-14',
            'doc': '#icon-yunpanlogo-2', 'docx': '#icon-yunpanlogo-2', 'txt': '#icon-yunpanlogo-8', 'pdf': '#icon-yunpanlogo-15',
          };
          const valueStr = (e.ctl_data && e.ctl_data.value ) || "";
          e.newValue = valueStr;
          let strArr = (valueStr && valueStr.split(";")) || [];
          strArr = strArr.filter(str => str.length > 10);
          strArr = strArr.map(name => name.split('/')[name.split('/').length - 1]) || [];
          e.ctl_data.value = strArr.map(file => {
            const type = file.split('.')[file.split('.').length - 1] || '';
            let name = file.replace(type, '');
            let index = name .lastIndexOf(".");  
            name = name.substring(0, index);
            const icn = icnMap[type] || '#icon-yunpanlogo-3';
            console.log('{ name, type, icn }', { name, type, icn });
            return { name, type, icn };
          })
        } else if(e.ctl_type === 'tag') {
          let checkArr = e.ctl_data.value.split(",") || [];
          let unCkeckArr =  e.ctl_data.alternate_value.split(",") || [];
          checkArr = checkArr.map(item => ({ name: item, checked: true }) );
          unCkeckArr = unCkeckArr.map(item => ({ name: item, checked: false }) );
          e.arr = checkArr.concat(unCkeckArr);
          console.log("e.arr ", e.arr, checkArr, unCkeckArr );
        } else if(e.ctl_type === 'show_text') {
          e.ctl_value = e.ctl_value && e.ctl_value.replace("<p>", "\r\n")
        } else if(e.ctl_type === 'edithtml') {
          e.htmlOption = JSON.parse(JSON.stringify(this.htmlOption));
          e.htmlOption.placeholder = e.ctl_placeholder;
        }
        e.isFirst = true;
        e.ctl_margin = this.pxToRem(e.ctl_margin);
        e.ctl_padding = this.pxToRem(e.ctl_padding);
        e.ctl_bar_height = this.pxToRem(e.ctl_bar_height);
        e.ctl_bar_width = this.pxToRem(e.ctl_bar_width);
        e.ctl_spacing = this.pxToRem(e.ctl_spacing);
        e.ctl_title_size = this.pxToRem(e.ctl_title_size);
        e.ctl_subtitle_size = this.pxToRem(e.ctl_subtitle_size);
        e.ctl_value_size = this.pxToRem(e.ctl_value_size);
        e.height = this.pxToRem(e.height);
        e.ctl_value_radius = this.pxToRem(e.ctl_value_radius);
        e.ctl_value_line_margin = this.pxToRem(e.ctl_value_line_margin);
        e.ctl_value_lineheight = this.pxToRem(e.ctl_value_lineheight);
        e.ctl_spacing = this.pxToRem(e.ctl_spacing);
        e.ctl_placeholder_size = this.pxToRem(e.ctl_placeholder_size);
        return e;
      })
      return newList;
    },
    onTagBox(item) {
      this.hasTagBox = true;
      this.tagItem = item;
    },
    addTagTxt() {
      console.log('this.tagItem', this.tagItem)
      console.log('this.tagAddTxt', this.tagAddTxt)
      this.tagItem.arr.push({name: this.tagAddTxt, checked: false});
      this.tagAddTxt = '';
      this.hasTagBox = false;
    },
    deleteFile(item, index) {
      item.ctl_data.value.splice(index, 1);
    },
    pxToRem(string='') {
      // console.log('string', string)
      if(!string || typeof string !== 'string' || string.indexOf('rem') !== -1) return string;
      let strArr = string.split(' ') || string;
      strArr = strArr.map(e => e.replace('px', ''));
      strArr = strArr.map(e => (parseInt(e) > 2 ? (parseInt(e) * 0.01334  + 'rem') : (e + 'px') ));
      // console.log('pxToRem strArr', strArr.join(' '));
      return strArr.join(' ');
    },
    getRandomColor() {
      const color = '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6); 
      return color !== '#ffffff' ? color : this.getRandomColor();
    },
    setKeyboardItem(item) {
      this.keyboardShow = true;
      this.keyboardItem = item;
    },
    onDelete(item) {
      console.log(item.ctl_data.value)
      console.log(typeof item.ctl_data.value)
      const value = item.ctl_data.value;
      if(typeof value === 'string' && value.length > 0) {
        item.ctl_data.value = value.substring(0, value.length);
      }
    },
    editboxFocus(item) {
      let { controls } = this;
      this.textAreaFocus(item);
      if(item.ctl_icon) {
        setTimeout(()=>{
          item.old_icon = item.ctl_icon;
          item.ctl_icon = "icon-roundclosefill";
        },20);
      }
    },
    editboxBlur(item) {
      this.textAreaBlur(item);
      let { controls } = this;
      if(item.old_icon) {
        setTimeout(()=>{
          item.ctl_icon = item.old_icon;
        },10);
      }
    },
    editboxInput(value, item) {
      console.log("editboxInput start", value, item)
      return;
      if(!item.ctl_data.decimal_digit || value[value.length-1] === '.') { return; }
      console.log("editboxInput start", !item.ctl_data.decimal_digit, value[value.length-1]);
      value = value.replace(/[^\d.]/g, "");
      const decimal_digit = item.ctl_data.decimal_digit;
      if(decimal_digit && typeof Number(decimal_digit) === 'number' && typeof Number(value) === 'number') {
        const nNum = Math.pow(10, Number(decimal_digit));
        value = Math.round(value * nNum) / nNum;
        console.log()
      }
      item.ctl_data.value = value.toString();
      console.log("item.ctl_data.value.length", item.ctl_data.value, item.ctl_data.value.length)
    },
    clearEditbox(item, index) {
      console.log("item.ctl_icon ", item.ctl_icon );
      if(item.ctl_icon === 'icon-roundclosefill') {
        item.ctl_data.value = '';
        const editRef = "editbox" + index;
        this.$refs[editRef][0].focus();
      }
    },
    textAreaFocus(item) {
      item.ctl_data.maxsize = item.ctl_data.maxsizeOld;
    },
    textAreaBlur(item) {
      item.ctl_data.maxsizeOld = item.ctl_data.maxsize;
      item.ctl_data.maxsize = 'hideLimit';
    },
    addTag(item, e) {
      console.log("addtag", e, item)
      console.log(e.target.value)
      item.arr.push({name: e.target.value, checked: true})
      console.log("item.arr", item.arr)
      item.arr = item.arr;
    },
    deleteTag(item, name) {
      const index = item.arr.findIndex(e => e === name);
      if(index) item.arr.splice(index, 1);
    },
    toggleTag(item, name) {
      console.log(item.arr, name)
      const index = item.arr.findIndex(e => e.name === name);
      console.log(index, item.arr[index])
      if(index) item.arr[index].checked = !item.arr[index].checked;
    },
    clickHandler(item, fucName, more) {
      console.log("clickHandler ctl_readonly", item.ctl_readonly)
      console.log("callback", typeof this[fucName])
      // this[fucName](item, more); // test
      if(item.ctl_readonly !== true) {
        this[fucName](item, more);
      } else {
        showToast({
          message: "无法修改只读数据！",
          type: 1
        });
      }
    },
    onCombox(item) {
      this.hasCombox = true;
      const value = item.ctl_data.value
      const labelArr = (value && value.split(',')) || [];
      const options = item.ctl_data.options || [];
      const valueArr = labelArr.map(datalable => options.find(op => op.label === datalable).value);
      item.values = valueArr || [];
      this.comboxItem = item;
      console.log('comboxItem', this.comboxItem) // labelArr  valueArr
      console.log('comboxItem.values ', this.comboxItem.values )
    },

    hideCombox() {
      this.hasCombox = false;
      const { comboxItem } =  this;
      const valueArr = comboxItem.values || [];
      const options = comboxItem.ctl_data.options || [];
      const labelArr = valueArr.map(datavalue => options.find(op => op.value === datavalue).label);
      this.comboxItem.ctl_data.value = labelArr.join(',')
    },

    comboxToggle(index) {
      this.$refs.checkboxes[index].toggle();
    },

    padLeft(str) {
      return "00".substring(0, 2 - str.length) + str
    },

    onDateBox(item) {
      const oldTime = item.ctl_data.value || "";
      const ctlTime = new Date(oldTime.replace(/-/g, '/'));
      item.ctlTime = ctlTime;
      item.oldTime = oldTime;
      this.timeItem = item;
      this.hasTimePicker = true;
    },

    onRegionBox(item) {
      this.regionItem = item;
      this.hasAreaPicker = true;
    },

    onMapBox(item) {
      this.hasMapBox = true;
      this.mapItem = item;
    },

    hideMapBox() {
      this.hasMapBox = false;
    },

    confirmMapBox() {
      console.log("this.mapName", this.mapName);
      // this.mapItem.ctl_data.value = this.mapName;
      this.hasMapBox = false;
    },

    confirmTimePicker(value) {
      this.hasTimePicker = false;
    },

    changeTimePicker(e) {
      console.log("changeTimePicker e.getValues()", e.getValues());
      let values = e.getValues().map(e => {
        if( e.includes("点")) {
          e += ":";

        } else if(e.includes("年") || e.includes("月")) {
          e += "-";
        }
        return e;
      })
      let timeStr = values.join("");
      if(timeStr.length > 10) { timeStr = timeStr.replace("日", "日 "); }
      timeStr = timeStr.replace( /[\u4e00-\u9fa5]/g, "");
      console.log("timeStr", timeStr)
      this.timeItem.ctl_data.value =timeStr;
    },

    cancelTimePicker(e) {
      this.timeItem.ctl_data.value = this.timeItem.oldTime;
      this.hasTimePicker = false;
    },

    onAreaBox(item) {
      const oldArea =  item.ctl_data.value || "";
      this.hasAreaPicker = true;
    },

    areaPickerConfirm(values) {
      console.log("areaPickerConfirm", values);
      this.hasAreaPicker = false;
      this.regionItem.ctl_data.value = values.join("/");
    },

    onHtmlnBox(item) {
      this.htmlItem = item;
      this.htmlOption.placeholder = item.ctl_placeholder,
      this.hasHtmlBox = true;
    },

    hideHtmlBox() {
      console.log("this.htmlItem", this.htmlItem);
      this.hasHtmlBox = false;
    },

    confirmHtmlBox() {
      console.log("this.htmlItem", this.htmlItem);
      this.hasHtmlBox = false;
      this.htmlItem.hasNew = true;
    },

    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      } else if (type === 'hour') {
        return `${val}点`;
      } else if (type === 'minute') {
        return `${val}分`;
      }
      return val;
    },

    beforeRead(item) {
      console.log('beforeRead', item.ctl_readonly)
      return item.ctl_readonly ? false : true;
    },

    prevent(e) {
      console.log("prevent", e)
      if(e&&e.preventDefault) {
        e.preventDefault();
      }
    },

    async imagesReader(file, item, type) {
      console.log("imagesReader file", file);
      console.log("imagesReader item", item);
      if(item.ctl_readonly === true) {
        return showToast({
          message: "无法修改只读数据！",
          type: 1
        });
      }

      const imgList = Array.isArray(file) ? file : [file];
      let formData = new FormData();
      imgList.map(e => {
        formData.append('uploads[]', e.file); // e.file
        e.status = 'uploading';
        e.message = '上传中...';
      })
      console.log("imgList", imgList)

      this.$openIndicator();
      let res = await this.$http.uploadImage({
        data: formData,
      });
      if (res.success === true) {
        imgList.map(e => {
          e.status = 'done';
          e.message = '上传成功';
        });
        console.log("uploadImage res", res);
        console.log("item value_resouce before", item.ctl_data.value_resouce);
        const newValue = item.newValue;
        const value_resouce = item.ctl_data.value_resouce;
        item.newValue = newValue.includes(";") || newValue === "" ? newValue : newValue + ";";
        item.ctl_data.value_resouce = value_resouce.includes(";") || value_resouce === "" ? value_resouce : value_resouce + ";";
        item.newValue += res.url || "";
        item.ctl_data.value_resouce += res.url || "";
        console.log("item value_resouce after", item.ctl_data.value_resouce);

        if(item.ctl_type === 'image') {
          const imgUrl = (res.url && res.url.replace(";", "")) || ""
          item.ctl_data.value = res.url ? [{ url: imgUrl, status: 'done' }] : [];
          console.log("image value", item.ctl_data.value)
        } else if(item.ctl_type === 'images') {
          let strArr = (res.url && res.url.split(";")) || [];
          strArr = strArr.filter(str => str.length > 10);
          const newArr = strArr.length > 0 ? strArr.map(imgUrl =>  { return {url: imgUrl, status: 'done' }}) : [];
          const filterArr = item.ctl_data.value.filter(arr => arr.url)
          console.log('filterArr', filterArr)
          console.log('strArr', strArr)
          item.ctl_data.value = [...filterArr, ...newArr ];
        }
        this.$nextTick(()=>{  //监听数据渲染完再关闭loading
          setTimeout(()=>{  //第二层延迟
            this.$closeIndicator();
          },300)
        });
      } else {
        this.$closeIndicator();
        if(item.ctl_type === 'image') {
          item.ctl_data.value = item.newValue || [];
        } else {
          item.ctl_data.value = item.ctl_data.value.filter(e => !imgList.includes(e));
        }
      }

    },

    async filesReader(file, item) {
      console.log("filesReader file", file);
      console.log("filesReader item", item);
      // return; // test
      if(item.ctl_readonly === true) {
        return showToast({
          message: "无法修改只读数据！",
          type: 1
        });
      }

      const fileList = Array.isArray(file) ? file : [file];
      let formData = new FormData();
      fileList.map(e => {
        formData.append('uploads[]', e.file);
        e.status = 'uploading';
        e.message = '上传中...';
      })
      console.log("fileList", fileList)

      this.$openIndicator();
      let res = await this.$http.uploadFile({
        data: formData,
      });
      console.log("uploadImage res", res);
      if (res.success === true) {
        fileList.map(e => {
          e.status = 'done';
          e.message = '上传成功';
        });
        console.log("item value_resouce before", item.ctl_data.value_resouce);
        const newValue = item.newValue;
        const value_resouce = item.ctl_data.value_resouce;
        item.newValue = newValue.includes(";") || newValue === "" ? newValue : newValue + ";";
        item.ctl_data.value_resouce = value_resouce.includes(";") || value_resouce === "" ? value_resouce : value_resouce + ";";
        item.newValue += res.url || "";
        item.ctl_data.value_resouce += res.url || "";
        console.log("item value_resouce after", item.ctl_data.value_resouce);

        const icnMap = 
        {
          'xls': '#icon-yunpanlogo-', 'xlsx': '#icon-yunpanlogo-', 'ppt': '#icon-yunpanlogo-1', 'pptx': '#icon-yunpanlogo-1',
          'jpg': '#icon-yunpanlogo-14', 'png': '#icon-yunpanlogo-14', 'jpeg': '#icon-yunpanlogo-14', 'gif': '#icon-yunpanlogo-14',
          'doc': '#icon-yunpanlogo-2', 'docx': '#icon-yunpanlogo-2', 'txt': '#icon-yunpanlogo-8', 'pdf': '#icon-yunpanlogo-15',
        };
        let strArr = (res.url && res.url.split(";")) || [];
        strArr = strArr.filter(str => str.length > 10);
        strArr = strArr.map(name => name.split('/')[name.split('/').length - 1]) || [];
        const newArr = strArr.map(file => {
          const type = file.split('.')[file.split('.').length - 1] || '';
          let name = file.replace(type, '');
          let index = name .lastIndexOf(".");  
          name = name.substring(0, index);
          const icn = icnMap[type] || '#icon-yunpanlogo-3';
          console.log('{ name, type, icn }', { name, type, icn });
          return { name, type, icn, status: 'done' };
        })
        const filterArr = item.ctl_data.value.filter(arr => arr.icn)
        console.log('filterArr', filterArr)
        console.log('strArr', strArr)
        item.ctl_data.value = [...filterArr, ...newArr ];

        this.$nextTick(()=>{  //监听数据渲染完再关闭loading
          setTimeout(()=>{  //第二层延迟
            this.$closeIndicator();
          },300)
        });
      } else {
        this.$closeIndicator();
        item.ctl_data.value = item.ctl_data.value.filter(e => !fileList.includes(e));
      }
    },



    async getformHome() {
      //获取首页数据
      this.$openIndicator();
      // let res = await this.$http.formList(window.location.href);
      let res = 
      {
        "success": true,
        "rcode": 200,
        "msg": "编辑客户页面组件清单",
        "data": {
          "title": "编辑客户资料",
          "type": "edit",
          "submit": "https://m.ixuechuang.com/api/customer",
          "//": "",
          "add_next": true,
          "controls": [
            {
              "ctl_id": "show_text_1",
              "//": "通栏文本",
              "ctl_type": "show_text",
              "ctl_visible": true,
              "ctl_margin": "20px 10px 20px 10px",
              "ctl_value": "        这是一个资料显示界资料显示界资料显示界客户资料显示界面的\n换行0演示",
              "ctl_value_align": "left",
              "ctl_value_size": "36px",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_color": "#333",
              "ctl_value_bkcolor": "#fff"
            },
            {
              "ctl_id": "show_image_1",
              "//": "通栏图片：居中通栏",
              "ctl_type": "show_image",
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_value": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1604711641,1616792627&fm=15&gp=0.jpg"
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "20px"
            },
            {
              "ctl_id": "group_1",
              "//": "分组条",
              "ctl_type": "group",
              "ctl_visible": true,
              "ctl_margin": "10px 0px 10px 0px",
              "ctl_padding": "5px 10px 5px 0px",
              "ctl_spacing": "20px",
              "ctl_bkcolor": "#ffffff",
              "ctl_bar_color": "#ff9900",
              "ctl_bar_width": "5px",
              "ctl_bar_height": "28px",
              "ctl_title": "基础资料",
              "ctl_title_color": "#000",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "36px",
              "ctl_subtitle": "分组标题说明",
              "ctl_subtitle_color": "#ccc",
              "ctl_subtitle_bold": false,
              "ctl_subtitle_italic": false,
              "ctl_subtitle_size": "28px"
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_id": "editbox_1",
              "//": "单行编辑框",
              "ctl_type": "editbox",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "姓名",
              "ctl_title_color": "#669900",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入姓名",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "user",
              "ctl_errormsg": "姓名不能为空！",
              "ctl_data": {
                "value": "叶思含",
                "//": "",
                "value_type": "text",
                "decimal_digit": "2",
                "maxsize": 100,
                "multiline": false
              }
            },
            {
              "ctl_id": "editbox_id",
              "//": "单行编辑框",
              "ctl_type": "editbox",
              "ctl_notnull": true,
              "ctl_readonly": true,
              "ctl_visible": false,
              "ctl_title": "id",
              "ctl_placeholder": "id",
              "ctl_icon": "user",
              "ctl_errormsg": "id不能为空！",
              "ctl_data": {
                "value": "2119",
                "//": "",
                "value_type": "text",
                "decimal_digit": "2",
                "maxsize": 100,
                "multiline": false
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_id": "editbox_2",
              "//": "单行编辑框",
              "ctl_type": "editbox",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "电话号码",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入电话号码",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "left",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "mobile",
              "ctl_errormsg": "电话号码不能为空！",
              "ctl_data": {
                "value": "13980829616",
                "//": "",
                "value_type": "mobile",
                "decimal_digit": "0",
                "maxsize": 100,
                "multiline": false
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "datetime_1",
              "ctl_type": "date",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "日期时间",
              "ctl_title_color": "#669900",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入日期时间",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有输入日期时间！",
              "ctl_data": {
                "value": "2019-10-10 15:12:35",
                "//": "日期/时间日期/时间",
                "value_type": "datetime"
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "date_1",
              "ctl_type": "date",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "日期",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入日期",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有输入日期！",
              "ctl_data": {
                "value": "2019-10-10",
                "//": "日期/时间日期/时间",
                "value_type": "date"
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "time_1",
              "ctl_type": "date",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "时间",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入时间",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有输入时间！",
              "ctl_data": {
                "value": "15:12:35",
                "//": "日期/时间日期/时间",
                "value_type": "time"
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "region_1",
              "ctl_type": "region",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "地域",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请选择所在的地域",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_error_msg": "你没有选择地域！",
              "ctl_data": {
                "value": "中国/四川省/成都市/高新区",
                "//": "国家/省/省市/省市县，根据类型限制控件呈现级别",
                "value_type": "country"
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_id": "address_1",
              "ctl_type": "address",
              "ctl_notnull": true,
              "ctl_readonly": true,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "地址",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入地址",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_json": true,
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有输入地址！",
              "ctl_data": {
                "value": "四川省成都市成华区青衣江路成都东站成都东火车站候车大厅",
                "//": "user_defined:false表示不允许客户自己输入地址，只能地图选择",
                "user_defined": true
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "image_1",
              "ctl_type": "image",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "单张图片",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请上传图片",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有上传图片！",
              "ctl_data": {
                "value": "http://m.ixuechuang.com/static/images/poster/611.jpg",
                "//": "头像/单张图片,can_edit=true设置不同的熟悉，见文档image/png，否则：image/jpeg",
                "can_edit": true
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "images_1",
              "ctl_type": "images",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "多张图片",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请上传图片",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有上传图片！",
              "ctl_data": {
                "value": "http://m.ixuechuang.com/static/images/poster/611.jpg;http://m.ixuechuang.com/static/images/poster/612.jpg;http://m.ixuechuang.com/static/images/poster/613.jpg;http://m.ixuechuang.com/static/images/poster/614.jpg;http://m.ixuechuang.com/static/images/poster/615.jpg",
                "//": "多张图片，可以点开查看大图，可以删除上传的图片",
                "value_type": "multiple",
                "maxfiles": 12
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "files_1",
              "ctl_type": "files",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "文件",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请上传文件",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你还没有上传文件！",
              "ctl_data": {
                "icon": "http: //www.baidu.com/a.jpg",
                "value": "http://m.ixuechuang.com/resource/files/保险术语保险术语保险术语保险术语保险术语保险术语.pdf;http://m.ixuechuang.com/resource/files/儿童保险销售技巧分享.doc;http://m.ixuechuang.com/resource/files/保险术语保险术语保险术语保险术语保险术语保险术语.xls;",
                "maxfiles": 99
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "tag_1",
              "ctl_type": "tag",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "标签",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请录入标签",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有录入标签！",
              "ctl_data": {
                "value": "标签1,标签2,标签3",
                "user_defined": true,
                "alternate_value": "备选标签1,备选标签2,备选标签3"
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "edithtml_1",
              "//": "HTML编辑框",
              "ctl_type": "edithtml",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "文章内容",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入文章内容，支持图文混排",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_errormsg": "没有输入文章内容！",
              "ctl_data": {
                "value": "这是一个HTML导弹导弹文本内容"
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_name": "richedit_1",
              "//": "多行编辑框",
              "ctl_type": "editbox",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "学习经历",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入学习经历",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_errormsg": "学习经历不能为空！",
              "ctl_data": {
                "value": "叶晓波学习经历学习经历",
                "//": "识别回车在编辑框内换行，自动适应高度",
                "maxsize": 100,
                "multiline": true
              }
            },
            {
              "ctl_id": "separator_1",
              "ctl_type": "separator",
              "ctl_visible": true,
              "//": "分隔条，可以设置高度，颜色，线型",
              "ctl_margin": "0px 0px 0px 0px",
              "color": "#f3f3f3",
              "linetype": "solid",
              "height": "1px"
            },
            {
              "ctl_id": "group_1",
              "//": "分组条",
              "ctl_type": "group",
              "ctl_visible": true,
              "ctl_margin": "10px 0px 10px 0px",
              "ctl_padding": "5px 10px 5px 0px",
              "ctl_spacing": "20px",
              "ctl_bkcolor": "#ffffff",
              "ctl_bar_color": "#ff9900",
              "ctl_bar_width": "5px",
              "ctl_bar_height": "28px",
              "ctl_title": "基础资料",
              "ctl_title_color": "#000",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "36px",
              "ctl_subtitle": "",
              "ctl_subtitle_color": "#ccc",
              "ctl_subtitle_bold": false,
              "ctl_subtitle_italic": false,
              "ctl_subtitle_size": "28px"
            },
            {
              "ctl_name": "combox_1",
              "//": "单复选框",
              "ctl_type": "combox",
              "ctl_notnull": true,
              "ctl_readonly": false,
              "ctl_visible": true,
              "ctl_margin": "0px 0px 0px 0px",
              "ctl_padding": "5px 10px 10px 10px",
              "ctl_spacing": "0px",
              "ctl_title": "性别",
              "ctl_title_color": "#666",
              "ctl_title_bold": false,
              "ctl_title_italic": false,
              "ctl_title_size": "30px",
              "ctl_title_align": "left",
              "ctl_placeholder": "请输入或选择性别",
              "ctl_placeholder_color": "#ccc",
              "ctl_placeholder_bold": false,
              "ctl_placeholder_italic": false,
              "ctl_placeholder_size": "28px",
              "ctl_value_align": "right",
              "ctl_value_color": "#333",
              "ctl_value_bold": false,
              "ctl_value_italic": false,
              "ctl_value_size": "36px",
              "ctl_icon": "图标",
              "ctl_error_msg": "你没有录入性别！",
              "ctl_data": {
                "value": "1,2",
                "options": [
                  {
                    "label": "图标",
                    "value": "1"
                  },
                  {
                    "label": "图标2",
                    "value": "2"
                  }
                ],
                "//": "menu=true表示以菜单方式显示单选列表",
                "menu": true,
                "///": "user_defined=true表示允许用户自己录入选项之外内容",
                "user_defined": false,
                "checkbox": true
              }
            }
          ]
        }
      };
      console.log("formList res", res);
      if (res.success === true) {
        const resControls = this.makeValue(res.data.controls);
        console.log("resControls", resControls )
        this.controls = resControls;
        this.pageSet.pageTitle = res.data.title;
        document.title = res.data.title || '通用表单';
        this.pageSet.type = res.data.type;
        this.pageSet.add_next = res.data.add_next;
        this.contentShow=true;
        this.$nextTick(()=>{  //监听数据渲染完再关闭loading
          setTimeout(()=>{  //第二层延迟
            this.$closeIndicator();
          },300)
        });
      } else {
        this.$closeIndicator();
      }
    },

    makeValue(controls) {
      controls.map(e => {
        if(e.ctl_type === 'group' || e.ctl_type === 'show_text' ||e.ctl_type === 'show_image') {
          if(!e.ctl_value) e.ctl_value = "";
        } else if (e.ctl_type === 'separator') {
        } else if (e.ctl_type === 'tag') {
          e.arr = [];
        } else if (e.ctl_type === 'combox') {
          e.values = [];
        } else {
          if(!e.ctl_data) e.ctl_data = {};
          if(!e.ctl_data.value) e.ctl_data.value = "";
          if(e.ctl_type === 'files' && !e.ctl_data.value_resouce) e.ctl_data.value_resouce = ""
        }
        return e;
      });
      return controls
    },

    async submit() {
      const { controls, pageSet: { submit, add_next, type } } = this;
      let href = submit && submit.includes("?") ? submit : window.location.href;
      href = type === "add" ? href.replace("&id=2119", "") : href;
      console.log("submit href", href);
      console.log("submit window.location", window.location);
      let willStop = false;
      let message = "";
      controls.some(e => {
        if(e.ctl_notnull) {
          console.log(e.ctl_id);
          if(e.ctl_type === 'group' || e.ctl_type === 'show_text' ||e.ctl_type === 'show_image') {
            if(!e.ctl_value) {
              willStop = true;
              message = e.ctl_error_msg;
              return true;
            }
          } else if (e.ctl_type === 'files') {
          } else {
            console.log("e.ctl_data.value", e.ctl_data.value);
            if(!e.ctl_data.value || e.ctl_data.value.length < 1) {
              willStop = true;
              message = e.ctl_error_msg;
              return true;
            }
          }
        }
      });
      if(willStop) {
        return showToast({
          message: message || "必填项不能为空！",
          type: 1
        });
      }
      const data = {};
      console.log("submit controls", controls);
      controls.map(e => {
          if(e.ctl_type === 'images' || e.ctl_type === 'image' || e.ctl_type === 'files') {
            data[e.ctl_id] = e.ctl_data.value_resouce;
          } else if (e.ctl_type === 'combox') {
            const value = e.ctl_data.value
            const labelArr = (value && value.split(',')) || [];
            console.log('labelArr', labelArr)
            const options = e.ctl_data.options || [];
            const valueArr = labelArr.map(datavalue => options.find(op => op.label === datavalue).value);
            // data[e.ctl_id] = valueArr.join(",");
            data[e.ctl_id || e.ctl_name] = valueArr.join(",");
        } else if (e.ctl_type === 'tag') {
          let nameArr = e.arr.filter(e => e.checked);
          nameArr = e.arr.map(item => item.name);
          data[e.ctl_id] = (nameArr && nameArr.join(",")) || e.ctl_data.value;
        } else if (e.ctl_type !== 'separator' && e.ctl_type !== 'group') {
          data[e.ctl_id] = (e.ctl_data && e.ctl_data.value) || e.ctl_value;
          console.log("data[e.ctl_id]", data[e.ctl_id]);
        }
      });
      console.log("submit data", data);

      this.$openIndicator();
      let res = await this.$http.updateFormList(href, {data});
      if (res.success === true) {
        this.$nextTick(()=>{  //监听数据渲染完再关闭loading
          setTimeout(()=>{  //第二层延迟
            this.$closeIndicator();
          },300)
        });
      } else {
        this.$closeIndicator();
      }

      if(type === "add" && add_next) {
        this.getformHome();
      } else {
        $goBack();
      }


    },

    reload() {
      //刷新
      // this.getformHome();
    },

    loadiframe() {
      let _this = this;
      window.addEventListener('message', function(event) {
          var loc = event.data;
          if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            console.log('location', loc);
            _this.mapName = loc.poiaddress + loc.poiname;
          }
      }, false);

    },


  },
  created() {
    this.getformHome();
    
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
/*共用样式 s*/
@mixin flexS {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@mixin flexC {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex_row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_bewteen {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.border_box {
  box-sizing: border-box;
}
.act1 {
  color: #ff9000 !important;
}
.act2 {
  color: #ff0000 !important;
}
.tl {
  align-items: flex-start !important;
}
.tc {
  align-items: center !important;
}
.tr {
  align-items: flex-end !important;
}
.bg1 {
  background: #ccc !important;
}
.widthAll {
  width: 100%;
}
/*共用样式 e*/


.form {
  height:100%;
  .preWrap {
    white-space: pre-wrap;
  }
  
  .zhanwei {
    height: 88px;
  }
  /* header样式 s*/
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    box-sizing: border-box;
    height: 88px;
    width: 100%;
    padding: 19px 0;
    background: #fff;
    border-bottom: 1px solid #ddd;
    @include flexS;
    .left {
      @include flexC;
      height: 88px;
      padding: 0 20px;
      font-size: 36px;
      color: #690;
      border-radius: 3px;
    }
    .page-title {
      // @include flexC;
      // height: 88px;
      max-width: 400px;
      // margin-right: 32px;
      font-size: 36px;
      color: #333333;
      border-radius: 3px;
      text-align: left;
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow: hidden;
    }
    .page-title-right {
      @include flexC;
      margin-left: 12px;
      padding: 0 30px;
      height: 88px;
      margin-right: 0;
      color: #690;
    }
  }
  /* header样式 e*/

  .basic {
    @include flexS;
    width: 100%;
    // padding: 0 30px;
    box-sizing: border-box;
  }

  .classShow {
    font-size: 32px;
    padding: 0;
    text-align: left;
  }
  .classGroup {
    width: 100%;
    box-sizing: border-box;
  }
  .groupTitle {
    padding-left: 20px;
    border-left: 2px solid #000;
    box-sizing: border-box;
  }
  .classTitle {
    color: #666;
    font-size: 32px;
  }
  .classSubTitle {
    padding-right: 30px;
  }

  .tag-wrap {
    .basicTitle {
      font-size: 42px;
      color: #999;
    }
    .tag-tip {
      color: rgb(204, 204, 204);
      font-size: 0.37352rem;
    }
  }
  .tag-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
    padding-top: 20px;
    .tag-class {
      position: relative;
      margin-right: 20px;
      margin-bottom: 20px;
      padding: 10px 30px;
      border-radius: 30px;
      font-size: 32px;
      color: #666;
      background-color: #eee;
    }
    .tag-checked {
      color: #ffffff;
      background-color: #690;
    }
  }

  .van-separator {
    border-bottom: 0.02rem dotted #ddd;
  }
  .separator-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 0.02rem dotted #ddd;
  }
  .padding-box{
    box-sizing: border-box;
  }

  .name-box {
    position: relative;
    height: 90px;
    width: 100vw;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow: hidden;
    .name-icn-box {
      float: left;
      height: 95%;
      .name-icn {
        max-width: calc(100vw - 2.3rem);
        height: 1rem;
        display: table-cell;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow: hidden;
      }
    }
    .file-name-box {
      height: 100%;
      // flex: 1;
      overflow: hidden;
      justify-content:space-between;
      align-items: center;
      box-sizing: border-box;
      font-size: 0.56rem;
      color: #666;
      margin-left: 10px;
      .file-name {
        text-align: left;
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow: hidden;
      }
      .file-type {
        height: 80px;
        width: 80px;
        flex-shrink: 0;
        .van-uploader__preview-delete {
          position: static;
        }
      }
    }
  }
  
  .h140 {
    // height: 140px;
    .basicTitle {
      font-size: 42px;
      color: #999;
    }
    .notNull {
      height: 0.6em;
      color: #ff0000;
      font-size: 32px;
    }
    .tipNum {
      position: relative;
      top: -5px;
      font-size: 32px;
      color: #ccc;
    }
    .ctlInput {
      width: 400px;
      text-align: right;
      font-size: inherit;
      color: #333;
    }
    .w450 {
      width: 450px;
    }
    .my-icon {
      padding: 20px 0 20px 20px;
      font-size: 36px;
      color: #ccc;
    }
    .single-img-wrap {
      font-size: 42px;
      color: #ccc;
      padding-right: 20px;
      min-height: 120px;
      .single-img-box {
        width: 100px;
        height: 100px;
        margin-left: 20px;
        background-color: #eee;
        text-align: center;
        line-height: 100px;
        border-radius: 50%;
        font-size: 32px;
        .single-img-icon {
          font-size: 36px;
          color: #ddd;
        }
      }
      .single-img-box2 {
        background-color: transparent;
      }
    }
    .tip-right {
      font-size: 42px;
      color: #ccc;
    }
  }

  .html-text-box {
    font-size: 30px;
  }

  .close-icon {
    position: absolute;
    top: -18px;
    right: -18px;
    font-size: 36px;
    color: #ff0000;
  }

  .upload-box {
    text-align: left;
    // padding-left: 30px;
    box-sizing: border-box;
  }

  .h90 {
    height: 90px;
    border-bottom: 0.04rem solid #ddd;
    .comboxTitle{
      font-size: 32px;
      columns: #333;
    }
    .btn {
      padding: 30px 0;
      font-size: 32px;
      color: #690;
    }
  }

  .map-item {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin-top: 88px;
    box-sizing: border-box;
    background: #fff;
    z-index: 22222;
  }

  .edit-html-box {
    width: 100%;
    min-height: 400px;
    height: 100vh;
  }

  .no_temp {
    @include flexC;
    font-size: 24px;
    color: #ccc;
    margin: 30px 0;
  }
  .formTop {
    padding-top: 40px;
    @include flexS;
    .left {
      position: relative;
      height: 31px;
      font-size: 31px;
      font-weight: bold;
      color: #333;
      padding-left: 26px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 9px;
        background: #ff9000;
      }
    }
    a {
      font-size: 24px;
      color: #6b9c09;
      padding-right: 26px;
    }
  }
  .noMore {
    font-size: 24px;
    color: #ccc;
    padding: 30px;
    text-align: center;
  }
}

</style>
<style lang="scss">
@mixin flexSB {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@mixin flexS {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form {
  .mint-checkbox-label {
    float: left;
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: none;
    left: 0;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-cell {
    height: 45px;
    @include flexS;
  }
  .van-cell__title {
    font-size: 21px;
    color: #333;
    text-align: left;
  }
  .van-picker__cancel, .van-picker__confirm {
    color: #690;
  }
  .van-uploader__preview-image, .van-uploader__upload {
    width: 105px;
    height: 105px;
    border: 1px solid #eeeeee;
  }
  .van-uploader__preview-delete {
    color: #ff0000;
    // font-size: 36px;
    // top: -18px;
    // right: -0;
  }

  .van-uploader__preview-image, .van-uploader__upload {
    // margin-right: 16px;
    // margin-bottom: 16px;
  }

  .upload_f_txt {
    font-size: 46px;
    color: #690;
  }
  .icon_f_box{
    display: inline-block;
    width: 56px;
    height: 56px;
    background-color: #690;
    border-radius: 12px;
    margin-right: 16px;
    margin-left: 10px;
    text-align: center;
    line-height: 56px;
    .upload-f-icon{
      font-size: 40px;
      color: #fff;
    }
  }

  .upload-file-box {
    .van-uploader {
      width: 100%;
      box-sizing: border-box;
    }
    .van-uploader__wrapper {
      flex-direction: column;
      flex-wrap: nowrap;
      .van-uploader__preview {
        display: none;
        width: 100%;
        // display: flex;
        justify-content: space-between;
        align-items: center;
        .van-uploader__preview-delete {
          position: static;
        }
        .van-uploader__file {
          width: 300px;
          height: 45px;
          border-bottom: 1px dotted #ddd;
          .van-uploader__file-name {
            text-align: left;
          }
          .van-uploader__file-icon {
            font-size: 36px;
          }
        }
      }
      .van-uploader__file {
        flex-direction: row;
        background-color: #fff;
      }
    }
  }

  .single-img-wrap {
    display: flex;
    align-items: center;
    .van-uploader {
      margin-left: 20px;
    }
    .van-uploader__preview-image, .van-uploader__upload {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .van-uploader__preview {
      margin: 0;
    }
    .van-icon-photograph::before {
      content: "+";
      font-weight: 100;
      font-size: 30px;
      color: #cccccc;
      position: relative;
      bottom: 6px;
    }
  }
  

  .mutil-box {
    .van-cell {
      height: auto;
      padding: 0;
      .van-field__control {
        font-size: 21px;
        line-height: 1.2em;
      }
      .van-field__clear {
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 17px;
        color: #690;
      }
      .van-field__clear::before{
        content: "清空";
      }
      .van-field__word-limit {
        font-size: 16px;
        color: #ccc;
      }
    }
    .van-cell--required::before {
      content: '';
    }
  }

  .single-img-outbox {
    width: 100%;
    .van-uploader {
      width: 100%;
      .van-uploader__input-wrapper {
        width: 100%;
      }
      .van-uploader__preview-image, .van-uploader__upload {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .van-uploader__preview {
        position: absolute;
        right: 12px;
        bottom: -2px;
      }
    }
  }

  .fix-single {
    .van-uploader {
      width: auto;
      .van-uploader__preview-image, .van-uploader__upload {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .van-uploader__preview {
        position: absolute;
        right: 0;
        bottom: -35px;
      }
    }
  }

  .edit-box {
    flex: 1;
    display: flex;
    align-items: center;
    .van-cell {
      height: auto;
      padding: 0;
      font-size: inherit;
      color: inherit;
      .van-field__control {
        font-size: inherit;
        color: inherit;
        line-height: 1.2em;
        text-align: right;
      }
      .van-cell__value {
        color: inherit;
      }
      .van-field__clear {
        color: #ccc;
      }
    }
  }

  .add-tag-box {
    .van-cell {
      background-color: #eeeeee;
      .van-field__control {
        background-color: #ffffff;
        text-align: left;
      }
      .van-button--small {
        border: none;
        background-color: #eeeeee;
      }
      .van-field__control {
        font-size: inherit;
      }
    }
  }

  .mutil-box {
    .van-cell {
      height: auto;
      padding: 0;
      font-size: inherit;
      color: inherit;
      .van-field__control {
        font-size: inherit;
        color: inherit;
        line-height: 1.2em;
        text-align: right;
      }
      .van-cell__value {
        color: inherit;
      }
      .van-field__clear {
        color: #ccc;
      }
    }
  }

  .van-field__control {
    font-size: 21px;
    line-height: 1.2em;
    text-align: right;
  }

  // .van-field__control::placeholder {
  //     font-size: 21px;
  //     color: red;
  // }

  .van-datetime-picker {
    .van-picker-column__item {
      // 日期时间组件界面字体, 日期组件界面字体, 时间组件界面字体,注意这里的字体大小是设计的两倍
      font-size: 16px;
    }
  }

  .quill-editor {
    .ql-container.ql-snow {
      // height: calc(100vh- 45px);
      min-height: 100px;
      font-size: 32px;
      color: #333;
      border: none;
    }
    .ql-toolbar.ql-snow .ql-formats {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      margin-right: 0;
    }
    .ql-snow .ql-picker-label {
      padding: 1.5px 2.5px;
      width: 36px;
      height: auto;
      max-height: 48px;
    }
    .ql-toolbar.ql-snow {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border: none;
      border-top: 1px solid #ccc;
      padding: 0;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label::before {
      position: relative;
      left: -3.5px;
      bottom: -4px;
      content: "H";
      font-weight: bold;
      text-align: left;
      font-size: 28px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label::after {
      content: '标题';
      position: relative;
      bottom: 13px;
      font-size: 10px;
      display: block;
    }
    .ql-snow .ql-color-picker .ql-picker-label {
      width: 36px;
      height: auto;
    }
    .ql-snow .ql-color-picker .ql-picker-label::after {
      content: '颜色';
      position: relative;
      bottom: 4.5px;
      font-size: 10px;
      display: block;
    }
    .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
      bottom: 12px;
      right: -10px;
      position: relative;
      width: 22px;
    }
    .ql-snow .ql-picker.ql-header {
      width: 40px;
    }
    .ql-snow.ql-toolbar button {
      width: 72px;
      height: auto;
      max-height: 96px;
    }
    .ql-snow.ql-toolbar button.ql-image::after {
      content: '图片';
      position: relative;
      bottom: 6px;
      font-size: 24px;
    }
    .ql-snow.ql-toolbar button.ql-blockquote::after {
      content: '引用';
      position: relative;
      bottom: 6px;
      font-size: 24px;
    }
    .ql-snow.ql-toolbar button.ql-bold::after {
      content: '粗体';
      position: relative;
      bottom: 6px;
      // bottom: 34px;
      font-size: 24px;
    }
    .ql-snow.ql-toolbar button.ql-list::after {
      content: '列表';
      position: relative;
      bottom: 6px;
      font-size: 24px;
    }
    .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label {
      padding: 1.5px 2.5px;
      width: 36px;
      height: auto;
    }
    .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label::after {
      content: '居左';
      position: relative;
      bottom: 5px;
      font-size: 12px;
    } // [data-value="justify"]:
    .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label[data-value="justify"]::after {
      content: '两端';
      font-size: 12px;
    }
    .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label[data-value="center"]::after {
      content: '居中';
    }
    .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label[data-value="right"]::after {
      content: '居右';
      font-size: 12px;
    }
    .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label[tabindex="0"] {
      position: relative;
      top: -1px;
    }
    .ql-snow .ql-picker {
      top: -12px;
    }
    .ql-snow .ql-icon-picker .ql-picker-item {
      height: 28px;
      width: 24px;
      padding: 2px 4px;
      width: 34px;
    }
    #ql-picker-options-0 {
      margin-top: -138px;
    }
    #ql-picker-options-1 {
      margin-top: -250px;
    }
    #ql-picker-options-2 {
      margin-top: -150px;
    }
  }

  /*设置字体的大小*/
  .quillEditor .ql-container {
    font-size: 32px !important;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    font-size: 1rem;
    fill: currentColor;
    overflow: hidden;
  }

  input::placeholder {
    font-size: 24px;
  }


}

html {
  touch-action: none;
}
</style>