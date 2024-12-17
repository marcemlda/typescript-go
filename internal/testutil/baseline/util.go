package baseline

import (
	"regexp"
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	testPathPrefix     = regexp.MustCompile(`(?:(file:\/{3})|\/)\.(?:ts|lib|src)\/`)
	testPathCharacters = regexp.MustCompile(`[\^<>:"|?*%]`)
	testPathDotDot     = regexp.MustCompile(`\.\.\/`)
)

var (
	libFolder   = "built/local/"
	builtFolder = "/.ts"
)

func removeTestPathPrefixes(text string, retainTrailingDirectorySeparator bool) string {
	testPathPrefix.ReplaceAllStringFunc(text, func(scheme string) string {
		if scheme != "" {
			return scheme
		}
		if retainTrailingDirectorySeparator {
			return "/"
		}
		return ""
	})
	return testPathPrefix.ReplaceAllString(text, "/")
}

func isDefaultLibraryFile(filePath string) bool {
	fileName := tspath.GetBaseFileName(filePath)
	return strings.HasPrefix(fileName, "lib.") && strings.HasSuffix(fileName, tspath.ExtensionDts)
}

func isBuiltFile(filePath string) bool {
	return strings.HasPrefix(filePath, libFolder) || strings.HasPrefix(filePath, tspath.EnsureTrailingDirectorySeparator(builtFolder))
}

func isTsConfigFile(path string) bool {
	return strings.Contains(path, "tsconfig") && strings.Contains(path, "json")
}

func sanitizeTestFilePath(name string) string {
	path := testPathCharacters.ReplaceAllString(name, "_")
	path = tspath.NormalizeSlashes(path)
	path = testPathDotDot.ReplaceAllString(path, "__dotdot/")
	path = string(tspath.ToPath(path, "", false /*useCaseSensitiveFileNames*/))
	return strings.TrimPrefix(path, "/")
}
