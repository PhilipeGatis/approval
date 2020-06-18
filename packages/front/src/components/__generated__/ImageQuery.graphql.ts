/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ImageQueryVariables = {
    approvalId: string;
};
export type ImageQueryResponse = {
    readonly approval: {
        readonly id: string;
        readonly assets: ReadonlyArray<{
            readonly assetUrl: string;
            readonly asset: string;
        }> | null;
    } | null;
};
export type ImageQuery = {
    readonly response: ImageQueryResponse;
    readonly variables: ImageQueryVariables;
};



/*
query ImageQuery(
  $approvalId: String!
) {
  approval(approvalId: $approvalId) {
    id
    assets {
      assetUrl
      asset
      id
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "approvalId",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "approvalId",
            "variableName": "approvalId"
        } as any)
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "assetUrl",
        "storageKey": null
    } as any), v4 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "asset",
        "storageKey": null
    } as any);
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "ImageQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "Approval",
                    "kind": "LinkedField",
                    "name": "approval",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Asset",
                            "kind": "LinkedField",
                            "name": "assets",
                            "plural": true,
                            "selections": [
                                (v3 /*: any*/),
                                (v4 /*: any*/)
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ImageQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "Approval",
                    "kind": "LinkedField",
                    "name": "approval",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Asset",
                            "kind": "LinkedField",
                            "name": "assets",
                            "plural": true,
                            "selections": [
                                (v3 /*: any*/),
                                (v4 /*: any*/),
                                (v2 /*: any*/)
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ]
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "ImageQuery",
            "operationKind": "query",
            "text": "query ImageQuery(\n  $approvalId: String!\n) {\n  approval(approvalId: $approvalId) {\n    id\n    assets {\n      assetUrl\n      asset\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'caa4afb302a06470a56b339425849fed';
export default node;
