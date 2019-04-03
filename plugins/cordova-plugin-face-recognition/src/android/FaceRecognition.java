package com.dude.plugins.recognition;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import static android.Manifest.permission.CAMERA;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.sensetime.stlivenesslibrary.ui.LivenessActivity;
import com.sensetime.stlivenesslibrary.util.Constants;
import com.wecash.livenessSdk.ActionModel;
import com.wecash.livenessSdk.LivenessSDK;
import com.wecash.livenessSdk.SDKLiveResultCallback;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import br.net.wecash.iemprestimos.MainActivity;

public class FaceRecognition
extends CordovaPlugin {
    private String action;
    private CallbackContext callbackContext;

    private JSONArray args;

    private static final String ACTION_CREATE = "create";
    private static final String TAG = "FaceRecognition";
    public static final String CAMERA = android.Manifest.permission.CAMERA;
    private static final int CREATE = 10006;
    private static String[] actions = new String[]{"BLINK", "NOD", "MOUTH", "YAW"};
    private static List<String> allActions = new ArrayList();
    @Override
    public boolean execute(String action, JSONArray args,
            final CallbackContext callbackContext) {

        Log.d(TAG, "execute called");

        this.action = action;
        this.args = args;
        this.callbackContext = callbackContext;

        if (cordova.hasPermission(CAMERA)) {
            Log.d(TAG, "Permission available");
            executeHelper();
        } else {
            Log.d(TAG, "No permissions, will request");
            cordova.requestPermission(this, 0, CAMERA);
        }
        return true;
    }

    private void executeHelper() {
        Log.d(TAG, "executeHelper with action " + action);
        if (ACTION_CREATE.equals(action)) {
            create(3, Constants.COMPLEXITY_NORMAL);
        } else {
            Log.d(TAG, "Invalid action: " + action + " passed");
            callbackContext.sendPluginResult(
                    new PluginResult(Status.INVALID_ACTION));
        }
    }

     private void create(int actionCount, String complexity) {
        // TODO: this code path needs to ask user for permission, currently
        // it does not.
         if(actionCount >= 2 && actionCount <= 4) {
             permutation("", new ArrayList(), actionCount);
             int randomInt = (new Random()).nextInt(allActions.size() - 1);
             String randomActionStr = (String)allActions.get(randomInt);
             Intent intent = new Intent(cordova.getActivity(), LivenessActivity.class);
             intent.putExtra("outType", "multiImg");
             intent.putExtra("soundNotice", false);
             intent.putExtra("complexity", complexity);
             intent.putExtra("com.sensetime.liveness.motionSequence", randomActionStr);
             cordova.startActivityForResult((CordovaPlugin) this, intent, CREATE);
         } else {
             Toast.makeText(cordova.getActivity(), "初始化错误，动作数目取值范围是2~4", Toast.LENGTH_SHORT).show();
         }

    }

    private static void permutation(String str, List<Integer> countList, int var) {
        if(var == 0) {
            allActions.add(str);
        } else {
            for(int i = 0; i < actions.length; ++i) {
                ArrayList listInt = new ArrayList();
                listInt.addAll(countList);
                if(!countList.contains(Integer.valueOf(i))) {
                    String result;
                    if(TextUtils.isEmpty(str)) {
                        result = str + actions[i];
                    } else {
                        result = str + " " + actions[i];
                    }

                    listInt.add(Integer.valueOf(i));
                    permutation(result, listInt, var - 1);
                }
            }

        }
    }

     public void onActivityResult(int requestCode, int resultCode, Intent intent) {
         LivenessSDK.handleResult(requestCode, resultCode, cordova.getActivity(), intent, new SDKLiveResultCallback() {
            @Override
            public void callback(List<ActionModel> list) {
                try {
                    PluginResult result;
                    StringBuilder builder = new StringBuilder("返回结果：");
                    JSONArray jsonArray = new JSONArray();
                    JSONObject tmpObj = null;

                    int count = list.size();
                    for(int i = 0; i < count; i++)
                    {
                        tmpObj = new JSONObject();
                        tmpObj.put("type" , list.get(i).actionType);
                        tmpObj.put("base64", Base64.encodeToString(list.get(i).imageByteArr, Base64.DEFAULT));
                        jsonArray.put(tmpObj);
                        tmpObj = null;
                    }
                    for (ActionModel actionModel : list) {
                        builder.append("\n").append(actionModel.actionType.getText()).append(" -> 图片数组大小：").append(actionModel.imageByteArr.toString());
                    }

                    result = new PluginResult(Status.OK, jsonArray);
                    callbackContext.sendPluginResult(result);
                    Log.i("AAA",builder.toString());
                } catch (JSONException err) {
                    Log.e(TAG, err.toString());
                }

            }
        });
     }
}