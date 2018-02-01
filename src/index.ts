/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

import {
  Widget

} from '@phosphor/widgets';


import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import {
  Kernel
} from '@jupyterlab/services';

import '../style/index.css';
import { JSONObject } from "@phosphor/coreutils/lib";

/**
 * A widget for rendering data, for usage with rendermime.
 */



export
class RenderedData extends Widget implements IRenderMime.IRenderer {
  /**
   * Create a new widget for rendering Vega/Vega-Lite.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
  };

  //
  test_kernel(code_content: string) {
      // Get a list of available kernels and connect to one.

      // Get info about the available kernels and start a new one.
      Kernel.getSpecs().then(kernelSpecs => {
        console.log('Default spec:', kernelSpecs.default);
        console.log('Available specs', Object.keys(kernelSpecs.kernelspecs));
        // use the default name
        let options: Kernel.IOptions = {
          name: kernelSpecs.default
        };
        console.log("Default: ", options);
        Kernel.startNew(options).then(kernel => {
            // Execute and handle replies.
            console.log('Future is not fulfilled yet');
            let future = kernel.requestExecute({ code: code_content } );
            future.done.then(() => {
                console.log('Future is fulfilled');
              });
            future.onIOPub = (msg) => {
                if (msg.header.msg_type == "execute_result") {
                    // console.log(msg);  // Print rich output data.
                    let result = msg.content.data;
                    console.log(result);
                    // return result
                    // result['text/html'];
                    // this.node.textContent = result["text/html"].toString();
                    // this.node.textContent = result as string;
                }
            };
            console.log("Great !")
        });
      });
  }
  /**
   * Render into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let data = model.data['application/vnd.dolo.yaml'] as string;
      // this.test_kernel(data);


      let code_content = 'import mylib\n';
      code_content += 'txt = """' + data + '"""\n';
      code_content += "mylib.process(txt)";
      console.log(code_content);

      // Get info about the available kernels and start a new one.
      Kernel.getSpecs().then(kernelSpecs => {
        console.log('Default spec:', kernelSpecs.default);
        console.log('Available specs', Object.keys(kernelSpecs.kernelspecs));
        // use the default name
        let options: Kernel.IOptions = {
          name: kernelSpecs.default
        };
        console.log("Default: ", options);
        Kernel.startNew(options).then(kernel => {
            // Execute and handle replies.
            console.log('Future is not fulfilled yet');
            let future = kernel.requestExecute({ code: code_content } );
            future.done.then(() => {
                console.log('Future is fulfilled');
              });
            future.onIOPub = (msg) => {
                if (msg.header.msg_type == "execute_result") {
                    // console.log(msg);  // Print rich output data.
                    let result = msg.content.data as JSONObject;
                    console.log(result);
                    // return result
                    // result['text/html'];
                    // this.node.textContent = result["text/html"].toString();
                    this.node.innerHTML = result["text/html"] as string;
                }
            };
            console.log("Great !")
        });
      });
      // this.node.textContent = data;
      resolve();
    });
  }

}

/**
 * A mime renderer factory for data.
 */
export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: false,
  mimeTypes: ['application/vnd.dolo.yaml'],
  createRenderer: options => new RenderedData(options)
};

const extensions = {
    id: `jupyterlab-dolo`,
    rendererFactory,
    rank: 0,
    dataType: 'string',
    fileTypes: [{
      name:'dolo',
      extensions:['.dolo','.yaml'],
      mimeTypes: ['application/vnd.dolo.yaml'],
      iconClass: 'jp-MaterialIcon jp-MSAIcon'
    }],
    documentWidgetFactoryOptions: {
      name: 'Dolo',
      primaryFileType: 'dolo',
      fileTypes: ['dolo','yaml'],
      defaultFor: ['Dolo'],
    }
  } as IRenderMime.IExtension;

export default extensions;
